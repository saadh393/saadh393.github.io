# Video Math

`<VideoMath>` turns HLS segment math into a small interactive calculator. Use it when a reader needs to understand how duration, segment length, and rendition count change total file output.

- Component: `app/components/mdx/VideoMath.tsx`
- Props:
- `segmentLength`: optional seconds per segment, defaults to `4`
- `renditionCount`: optional number of renditions, defaults to `4`
- `title`: optional heading, defaults to `HLS File Count Calculator`
- When to use: for streaming and HLS articles where the math should feel concrete
