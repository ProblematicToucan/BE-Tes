import { Response } from "express";
import { IAuthenticatedRequest } from "../../middleware/Authorization";
import pool from "../../db/Database";
import { IUpdateRuas, ICreateRuas } from "../../models/RuasModel";

const queryGetRuas = "SELECT * FROM public.ruas";
const queryGetRuasCoord = "SELECT * FROM public.ruas_coordinates";
const queryGetRuasById = "SELECT * FROM public.ruas WHERE id = $1";
const queryGetRuasCoordByRuasId = "SELECT * FROM public.ruas_coordinates WHERE ruas_id = $1";
const queryAddRuas = "INSERT INTO public.ruas (ruas, km_awal, km_akhir, status, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, true, $4, $4, NOW(), NOW()) RETURNING id";
const queryAddRuasCoord = "INSERT INTO public.ruas_coordinates (ruas_id, coordinates, created_by, updated_by, created_at, updated_at) VALUES ($1, $2, $3, $3, NOW(), NOW())";
const queryUpdateRuas = 'UPDATE public.ruas SET ruas = $1, km_awal = $2, km_akhir = $3, status = $4, updated_by = $5, updated_at = NOW() WHERE id = $6';
const queryUpdateRuasCoord = 'UPDATE public.ruas_coordinates SET coordinates = $1, updated_by = $2, updated_at = NOW() WHERE id = $3';
const deleteRuasCoordQuery = 'DELETE FROM public.ruas_coordinates WHERE ruas_id = $1';
const deleteRuasQuery = 'DELETE FROM public.ruas WHERE id = $1';

class GisController {
    static async getRuasTol(req: IAuthenticatedRequest, res: Response) {
        try {
            const { rows: ruas } = await pool.query(queryGetRuas);
            const { rows: ruasCoordinates } = await pool.query(queryGetRuasCoord);

            // Mengelompokkan data ruas_coordinates berdasarkan ruas_id menggunakan objek dictionary
            const ruasCoordinatesMap = ruasCoordinates.reduce((acc, cur) => {
                const ruasId = cur.ruas_id;
                if (!acc[ruasId]) {
                    acc[ruasId] = [];
                }
                acc[ruasId].push(cur);
                return acc;
            }, {});

            // Menggabungkan data ruas dengan ruas_coordinates berdasarkan ruas_id
            const result = ruas.map((ruasData) => {
                const coordinates = ruasCoordinatesMap[ruasData.id] || [];
                return { ...ruasData, coordinates };
            });

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }

    static async getRuasTolById(req: IAuthenticatedRequest, res: Response) {
        const id = parseInt(req.params.id, 10);

        try {
            const { rows: ruas, rowCount } = await pool.query(queryGetRuasById, [id]);
            if (rowCount === 0) {
                return res.status(404).json({ error: 'Ruas not found' });
            }
            const { rows: ruasCoordinates } = (await pool.query(queryGetRuasCoordByRuasId, [id]));
            const result = {
                id: ruas[0].id,
                ruas: ruas[0].ruas,
                km_awal: ruas[0].km_awal,
                km_akhir: ruas[0].km_akhir,
                status: ruas[0].status,
                created_by: ruas[0].created_by,
                updated_by: ruas[0].updated_by,
                created_at: ruas[0].created_at,
                updated_at: ruas[0].updated_at,
                coordinates: ruasCoordinates,
            };

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }

    static async createRuasTol(req: IAuthenticatedRequest, res: Response) {
        const { ruas, km_awal, km_akhir, coordinates }: ICreateRuas = req.body;

        try {
            const { rows } = await pool.query(queryAddRuas, [ruas, km_awal, km_akhir, req.user.username]);
            const ruasId = rows[0].id;
            console.log(ruasId);

            for (const coord of coordinates) {
                await pool.query(queryAddRuasCoord, [ruasId, coord.coordinates, req.user.username])
            }

            res.status(201).json({ message: 'Data ruas successfully created' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }

    static async updateRuasTol(req: IAuthenticatedRequest, res: Response) {
        const ruasId = parseInt(req.params.id, 10);
        const { ruas, km_awal, km_akhir, status, coordinates }: IUpdateRuas = req.body;

        try {
            // Periksa apakah data "ruas" dengan ID yang dimaksud ada dalam database
            const { rowCount: ruasCount } = await pool.query(queryGetRuasById, [ruasId]);
            if (ruasCount === 0) {
                return res.status(404).json({ error: 'Ruas not found' });
            }

            // Update data "ruas" di database
            await pool.query(queryUpdateRuas, [ruas, km_awal, km_akhir, status, req.user.username, ruasId]);

            // // Update data "ruas_coordinates" yang baru ke database
            for (const coord of coordinates) {
                await pool.query(queryUpdateRuasCoord, [coord.coordinates, req.user.username, coord.id]);
            }

            res.status(204).json('ok');
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }

    static async deleteRuasTol(req: IAuthenticatedRequest, res: Response) {
        const id = parseInt(req.params.id, 10);
        try {
            // Hapus data "ruas_coordinates" yang terkait dengan ruas tersebut di database
            await pool.query(deleteRuasCoordQuery, [id]);

            // Hapus data "ruas" di database
            const result = await pool.query(deleteRuasQuery, [id]);

            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Ruas not found' });
            }

            res.status(200).json({ message: 'Data ruas deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error', log: error });
        }
    }
}

export default GisController;
