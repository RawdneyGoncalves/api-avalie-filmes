import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

export async function errorHandler(
    error: FastifyError,
    _request: FastifyRequest,
    reply: FastifyReply
) {
    console.error(error);
    reply.status(500).send({ error: 'Internal Server Error' });
}
