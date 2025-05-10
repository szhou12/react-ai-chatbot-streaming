import { EventSourceParserStream } from 'eventsource-parser/stream';

/**
 * Pipeline to streamline HTTP response from server (your backend or OpenAI API)
 * 1. Read from a streaming HTTP response
 * 2. Decode it (binary -> text)
 * 3. Parse it as SSE (text -> structured SSE events)
 * 4. Yield just the useful .data fields
 * 
 * async function* = asynchronous generator function
 * so it can yield data and you can call this fcn by `for await {each chunk of fcn}`
 */
export async function* parseSSEStream(stream) {
    // stream: A ReadableStream from the Response.body (binary chunks). In SSE format.
    // TextDecoderStream: Convert binary chunks to text
    // EventSourceParserStream: Parses the text stream into structured SSE events. i.e. clean JavaScript payloads (valid JSON) so can reliably extract each meaningful message (.data)
    // getReader: Returns a reader to manually pull each parsed event
    const sseReader = stream
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new EventSourceParserStream())
        .getReader();

    while (true) {
        const {done, value} = await sseReader.read();
        if (done) break;
        yield value.data;
    }
}