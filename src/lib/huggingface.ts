import { HfInference } from '@huggingface/inference'

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// ===================================================
// TEXT GENERATION - For chatbots, recommendations
// ===================================================

export async function generateText(prompt: string, maxLength: number = 200): Promise<string> {
  try {
    const response = await hf.textGeneration({
      model: 'microsoft/DialoGPT-medium',
      inputs: prompt,
      parameters: {
        max_new_tokens: maxLength,
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.2,
      },
    })
    return response.generated_text
  } catch (error) {
    console.error('Text generation error:', error)
    throw new Error('Failed to generate text')
  }
}

// ===================================================
// TEXT SUMMARIZATION - For resume analysis
// ===================================================

export async function summarizeText(text: string): Promise<string> {
  try {
    const response = await hf.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: text,
      parameters: {
        max_length: 150,
        min_length: 50,
      },
    })
    return response.summary_text
  } catch (error) {
    console.error('Summarization error:', error)
    throw new Error('Failed to summarize text')
  }
}

// ===================================================
// SENTIMENT ANALYSIS - For reviews, feedback
// ===================================================

export interface SentimentResult {
  label: string
  score: number
}

export async function analyzeSentiment(text: string): Promise<SentimentResult[]> {
  try {
    const response = await hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english',
      inputs: text,
    })
    return response as SentimentResult[]
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    throw new Error('Failed to analyze sentiment')
  }
}

// ===================================================
// ZERO-SHOT CLASSIFICATION - For categorization
// ===================================================

export interface ClassificationResult {
  labels: string[]
  scores: number[]
  sequence: string
}

export async function classifyText(
  text: string,
  labels: string[]
): Promise<ClassificationResult> {
  try {
    const response = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: text,
      parameters: {
        candidate_labels: labels,
      },
    })
    return response as unknown as ClassificationResult
  } catch (error) {
    console.error('Classification error:', error)
    throw new Error('Failed to classify text')
  }
}

// ===================================================
// QUESTION ANSWERING - For Q&A features
// ===================================================

export interface QAResult {
  answer: string
  score: number
  start: number
  end: number
}

export async function answerQuestion(
  question: string,
  context: string
): Promise<QAResult> {
  try {
    const response = await hf.questionAnswering({
      model: 'deepset/roberta-base-squad2',
      inputs: {
        question,
        context,
      },
    })
    return response as QAResult
  } catch (error) {
    console.error('Question answering error:', error)
    throw new Error('Failed to answer question')
  }
}

// ===================================================
// FEATURE EXTRACTION - For embeddings, similarity
// ===================================================

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: text,
    })
    // Flatten if nested array
    if (Array.isArray(response[0])) {
      return (response as number[][]).flat()
    }
    return response as number[]
  } catch (error) {
    console.error('Feature extraction error:', error)
    throw new Error('Failed to extract features')
  }
}

// ===================================================
// SIMILARITY CALCULATION - For recommendations
// ===================================================

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

// ===================================================
// PRODUCT RECOMMENDATIONS - For E-Commerce
// ===================================================

export interface ProductRecommendation {
  productId: string
  score: number
  reason: string
}

export async function getProductRecommendations(
  userPreferences: string,
  products: { id: string; name: string; description: string; category: string }[]
): Promise<ProductRecommendation[]> {
  try {
    // Get embedding for user preferences
    const userEmbedding = await getEmbeddings(userPreferences)
    
    // Get embeddings for all products
    const productScores = await Promise.all(
      products.map(async (product) => {
        const productText = `${product.name} ${product.description} ${product.category}`
        const productEmbedding = await getEmbeddings(productText)
        const similarity = cosineSimilarity(userEmbedding, productEmbedding)
        
        return {
          productId: product.id,
          score: similarity,
          reason: `Based on your interest in ${product.category}`,
        }
      })
    )
    
    // Sort by similarity score and return top recommendations
    return productScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  } catch (error) {
    console.error('Product recommendation error:', error)
    throw new Error('Failed to get recommendations')
  }
}

// ===================================================
// RESUME ANALYSIS - For Resume Analyzer
// ===================================================

export interface ResumeAnalysisResult {
  overallScore: number
  experienceScore: number
  educationScore: number
  skillsScore: number
  formatScore: number
  summary: string
  strengths: string[]
  improvements: string[]
  keywords: string[]
}

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysisResult> {
  try {
    // Summarize the resume
    const summary = await summarizeText(resumeText)
    
    // Classify resume sections
    const sectionLabels = [
      'work experience',
      'education',
      'technical skills',
      'projects',
      'certifications',
    ]
    const classification = await classifyText(resumeText, sectionLabels)
    
    // Analyze sentiment for confidence
    const sentiment = await analyzeSentiment(resumeText)
    
    // Extract key skills by classification
    const skillLabels = [
      'programming',
      'leadership',
      'communication',
      'problem solving',
      'teamwork',
    ]
    const skillClassification = await classifyText(resumeText, skillLabels)
    
    // Calculate scores based on analysis
    const experienceScore = classification.scores[0] * 100
    const educationScore = classification.scores[1] * 100
    const skillsScore = classification.scores[2] * 100
    const formatScore = 75 // Base score, can be enhanced with more analysis
    
    const overallScore = (experienceScore + educationScore + skillsScore + formatScore) / 4
    
    // Generate strengths and improvements
    const strengths: string[] = []
    const improvements: string[] = []
    
    if (experienceScore > 60) strengths.push('Strong work experience section')
    else improvements.push('Expand your work experience descriptions')
    
    if (educationScore > 60) strengths.push('Well-documented education')
    else improvements.push('Add more details about your education')
    
    if (skillsScore > 60) strengths.push('Good technical skills coverage')
    else improvements.push('Include more relevant technical skills')
    
    // Extract keywords
    const keywords = skillLabels
      .map((label, index) => ({ label, score: skillClassification.scores[index] }))
      .filter(k => k.score > 0.3)
      .map(k => k.label)
    
    return {
      overallScore: Math.round(overallScore),
      experienceScore: Math.round(experienceScore),
      educationScore: Math.round(educationScore),
      skillsScore: Math.round(skillsScore),
      formatScore: Math.round(formatScore),
      summary,
      strengths,
      improvements,
      keywords,
    }
  } catch (error) {
    console.error('Resume analysis error:', error)
    throw new Error('Failed to analyze resume')
  }
}

// ===================================================
// CHAT COMPLETION - For interactive features
// ===================================================

export async function chatCompletion(
  messages: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  try {
    // Build conversation context
    const conversation = messages
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n')
    
    const prompt = `${conversation}\nAssistant:`
    
    const response = await hf.textGeneration({
      model: 'microsoft/DialoGPT-medium',
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.8,
        top_p: 0.9,
        repetition_penalty: 1.2,
      },
    })
    
    return response.generated_text.replace(prompt, '').trim()
  } catch (error) {
    console.error('Chat completion error:', error)
    throw new Error('Failed to generate chat response')
  }
}
