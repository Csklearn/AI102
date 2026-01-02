import { pipeline } from '@huggingface/transformers';

// The model 'sentence-transformers/all-MiniLM-L6-v2' needs an ONNX version
// which is available under the community user 'Xenova' on the Hugging Face Hub.
const modelName = 'Xenova/all-MiniLM-L6-v2';

/**
 * Generates embeddings for an array of sentences.
 */
export async function generateEmbeddings(sentences) {
  try {
    // Create a feature-extraction pipeline.
    // The library automatically handles downloading and caching the ONNX model files.
    const extractor = await pipeline('feature-extraction', modelName);

    // Compute sentence embeddings with mean pooling and L2 normalization
    const output = await extractor(sentences, {
      pooling: 'mean',    // Apply mean pooling to get a single vector per sentence
      normalize: true     // L2 normalize the resulting vectors
    });

    // The output is a Tensor, which you can convert to a standard JavaScript array/Float32Array
    console.log(sentences)
    console.log('Output:', output);
    console.log("Embeddings:", output.data.map);
    console.log("Shape:", output.dims); // Should be [number_of_sentences, 384] for this model

    return Array.from(output.data);

  } catch (error) {
    console.error("Error generating embeddings:", error);
  }
}

// Example usage:

//generateEmbeddings(sentences);
