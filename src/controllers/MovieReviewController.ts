import { FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable } from 'inversify';
import { IMovieReviewService } from '../interfaces/IMovieReviewService';
import TYPES from '../inversify/types';
import { CreateMovieReviewDTO } from '../dtos/CreateMovieReviewDTO';
import { UpdateMovieReviewDTO } from '../dtos/UpdateMovieReviewDTO';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@injectable()
export class MovieReviewController {
    private service: IMovieReviewService;

    constructor(@inject(TYPES.IMovieReviewService) service: IMovieReviewService) {
        this.service = service;
    }

    /**
     * @swagger
     * /movie-reviews:
     *   post:
     *     summary: Cria uma nova anotação de filme
     *     tags:
     *       - MovieReviews
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateMovieReviewDTO'
     *     responses:
     *       201:
     *         description: Anotação criada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/MovieReview'
     *       400:
     *         description: Dados inválidos
     *       500:
     *         description: Erro interno do servidor
     */
    async createReview(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        const dto = plainToClass(CreateMovieReviewDTO, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return reply.status(400).send({ errors });
        }

        try {
            const review = await this.service.createReview(dto.title, dto.notes);
            reply.status(201).send(review);
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao criar a anotação' });
        }
    }

    /**
     * @swagger
     * /movie-reviews:
     *   get:
     *     summary: Lista todas as anotações de filmes
     *     tags:
     *       - MovieReviews
     *     parameters:
     *       - in: query
     *         name: sortBy
     *         schema:
     *           type: string
     *           enum: [released, imdbRating]
     *         description: Campo para ordenar
     *       - in: query
     *         name: order
     *         schema:
     *           type: string
     *           enum: [asc, desc]
     *         description: Ordem da ordenação
     *       - in: query
     *         name: title
     *         schema:
     *           type: string
     *         description: Filtrar por título
     *       - in: query
     *         name: actors
     *         schema:
     *           type: string
     *         description: Filtrar por atores
     *       - in: query
     *         name: director
     *         schema:
     *           type: string
     *         description: Filtrar por diretor
     *     responses:
     *       200:
     *         description: Lista de anotações
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/MovieReview'
     *       500:
     *         description: Erro interno do servidor
     */
    async getAllReviews(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        const { sortBy, order, title, actors, director } = req.query as any;
        const filters = { title, actors, director };
        const sort = { field: sortBy, order };

        try {
            const reviews = await this.service.getAllReviews(filters, sort);
            reply.send(reviews);
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao buscar as anotações' });
        }
    }

    /**
     * @swagger
     * /movie-reviews/{id}:
     *   get:
     *     summary: Obtém uma anotação específica
     *     tags:
     *       - MovieReviews
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da anotação
     *     responses:
     *       200:
     *         description: Detalhes da anotação
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/MovieReview'
     *       404:
     *         description: Anotação não encontrada
     *       500:
     *         description: Erro interno do servidor
     */
    async getReviewById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        const { id } = req.params as { id: string };
        try {
            const review = await this.service.getReviewById(Number(id));
            if (review) {
                reply.send(review);
            } else {
                reply.status(404).send({ error: 'Anotação não encontrada' });
            }
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao buscar a anotação' });
        }
    }

    /**
     * @swagger
     * /movie-reviews/{id}:
     *   put:
     *     summary: Atualiza uma anotação específica
     *     tags:
     *       - MovieReviews
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da anotação
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateMovieReviewDTO'
     *     responses:
     *       200:
     *         description: Anotação atualizada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/MovieReview'
     *       400:
     *         description: Dados inválidos
     *       404:
     *         description: Anotação não encontrada
     *       500:
     *         description: Erro interno do servidor
     */
    async updateReview(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        const { id } = req.params as { id: string };
        const dto = plainToClass(UpdateMovieReviewDTO, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return reply.status(400).send({ errors });
        }

        try {
            const updated = await this.service.updateReview(Number(id), dto.notes);
            if (updated) {
                reply.send(updated);
            } else {
                reply.status(404).send({ error: 'Anotação não encontrada' });
            }
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao atualizar a anotação' });
        }
    }

    /**
     * @swagger
     * /movie-reviews/{id}:
     *   delete:
     *     summary: Deleta uma anotação específica
     *     tags:
     *       - MovieReviews
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da anotação
     *     responses:
     *       204:
     *         description: Anotação deletada com sucesso
     *       404:
     *         description: Anotação não encontrada
     *       500:
     *         description: Erro interno do servidor
     */
    async deleteReview(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        const { id } = req.params as { id: string };
        try {
            const success = await this.service.deleteReview(Number(id));
            if (success) {
                reply.status(204).send();
            } else {
                reply.status(404).send({ error: 'Anotação não encontrada' });
            }
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao deletar a anotação' });
        }
    }
}