import { ElasticSearchProvider } from '../../shared/database/elasticsearch';
import { DocumentCreatedDto } from '../../shared/dtos';

/**
 *  Repository base with common functions
 *
 * @class BaseRepository
 * @template T Type of the repository
 */
export class BaseRepository<T> {
    /**
     * Creates an instance of BaseRepository.
     *
     * @param {ElasticSearchProvider} esProvider Instance of the ElasticSearchProvider
     * @param {Type} type Type of the repository, used to extract Index decorator for ElasticSearch documents
     * @memberof BaseRepository
     */
    constructor(
        private readonly esProvider: ElasticSearchProvider,
        private readonly type: { new(): T; }
    ) { }

    /**
     * Creates a new document
     *
     * @param {*} dto DTO to create a new document
     * @returns {Promise<DocumentCreatedDto>} Promise of the response with the document created
     * @memberof BaseRepository
     */
    async index(dto: any): Promise<DocumentCreatedDto> {
        return this.esProvider.index(dto, this.type);
    }

    /**
     *  Updates a document by ID
     *
     * @param {string} id ID of the document to update
     * @param {T} updatedEntity Document to update
     * @returns
     * @memberof BaseRepository
     */
    async updateById(id: string, updatedEntity: T) {
        return this.esProvider.updateById(updatedEntity, id, this.type);
    }

    /**
     * Gets documents by ID's
     *
     * @param {string[]} ids ID's of the documents to find
     * @returns {Promise<T[]>} Promise of an array of documents of the type specified
     * @memberof BaseRepository
     */
    async fetchByIds(ids: string[]): Promise<T[]> {
        return this.esProvider.fetchByIds(ids, this.type);
    }

    /**
     *  Gets a document by ID
     *
     * @param {string} id ID of the document to find
     * @returns {Promise<T>} Promise of an object of the type specified
     * @memberof BaseRepository
     */
    async fetchById(id: string): Promise<T> {
        return this.esProvider.fetchById(id, this.type);
    }

    /**
     * Gets document according to a search
     *
     * @param {*} content Object with matching parameters
     * @returns {Promise<T>} Promise of an object of the type specified
     * @memberof BaseRepository
     */
    async fetchOne(content: any): Promise<T> {
        return this.esProvider.fetchOne(content, this.type);
    }

    /**
     * Gets all the documents
     *
     * @returns {Promise<T[]>} Promise of an array of objects of the type specified
     * @memberof BaseRepository
     */
    async fetchAll(): Promise<T[]> {
        return this.esProvider.fetchAll(this.type);
    }
}
