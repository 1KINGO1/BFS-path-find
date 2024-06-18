export default interface IPathFinder<T> {
	findPath(start: T, end: T): Promise<T[]>;
}