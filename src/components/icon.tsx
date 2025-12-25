export function Icon({
	width,
	height,
	url,
	alt,
	...rest
}: {
	width?: number;
	height?: number;
	url: string;
	alt?: string;
}) {
	return <img src={url} style={{ width: width ?? 30, height: height ?? 30 }} {...rest} alt={alt} />;
}
