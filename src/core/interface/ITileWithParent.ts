export default interface ITileWithParent<T> {
	tile: T,
	parent: ITileWithParent<T> | null
}