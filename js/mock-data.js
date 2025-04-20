/**
 * Mock Data for Local Development
 * This file provides mock data for testing blog functionality when the real API is not available
 */

// Mock blog posts data
const mockBlogPosts = {
  posts: [
    {
      id: "1",
      title: "Building Better Language Models for Indian Languages",
      slug: "language-models-for-indian-languages",
      category: "NLP",
      excerpt: "Exploring the challenges and techniques for developing effective language models for low-resource Indian languages like Bengali and Assamese.",
      content: `
# Building Better Language Models for Indian Languages

## Introduction

One of the most pressing challenges in modern NLP is developing effective language models for low-resource languages. India, with its linguistic diversity of over 22 officially recognized languages and hundreds of dialects, presents a particularly complex environment for language technology development.

## The Challenge of Low-Resource Languages

Most Indian languages face several challenges when it comes to NLP:

1. **Limited digital text corpora**: Many Indian languages have limited amounts of text available in digital form.
2. **Complex writing systems**: Several Indian scripts have complex rules and interactions between characters.
3. **Morphological richness**: Languages like Tamil, Malayalam, and Bengali have complex morphological structures.
4. **Code-mixing**: In digital communications, it's common to see code-mixing between English and native languages.

## Case Study: Bengali Language Model

In my recent work, I focused on developing a specialized language model for Bengali, the seventh most spoken language in the world. Here's how we approached the problem:

### Data Collection and Preprocessing

- We gathered text from various sources including Bengali news sites, literature archives, Wikipedia, and social media.
- Data cleaning was particularly challenging because of encoding issues and the need to handle Bengali-specific characters properly.
- We developed specialized tokenization methods that respect Bengali morphological structures.

### Model Architecture

For our Bengali language model, we experimented with several approaches:

\`\`\`python
import torch
from transformers import AutoTokenizer, AutoModelForMaskedLM

# Initialize the model with a multilingual base
tokenizer = AutoTokenizer.from_pretrained("xlm-roberta-base")
model = AutoModelForMaskedLM.from_pretrained("xlm-roberta-base")

# Fine-tune for Bengali
# Code for fine-tuning goes here
\`\`\`

### Evaluation and Results

Our evaluation showed that:

- Domain-adapted models performed significantly better than general models
- Including transliterated content improved performance on social media texts
- Handling Bengali-specific grammatical structures required specialized attention mechanisms

## Conclusion

Building effective language models for Indian languages remains challenging but is essential for digital inclusion. Our work on Bengali demonstrates that with appropriate architectural choices and data preparation, we can achieve significant improvements over general-purpose multilingual models.

In future work, we aim to extend these approaches to other low-resource Indian languages and explore cross-lingual transfer learning between related language families.
      `,
      publishedAt: "2023-11-15T10:30:00Z",
      featured: true
    },
    {
      id: "2",
      title: "Evaluating LLMs for Scientific Literature Review",
      slug: "llms-for-scientific-literature-review",
      category: "LLMs",
      excerpt: "A comprehensive analysis of how large language models perform when tasked with scientific literature review and knowledge synthesis tasks.",
      content: `
# Evaluating LLMs for Scientific Literature Review

## Introduction

Large Language Models (LLMs) have shown impressive capabilities across various domains, but their application in specialized scientific contexts remains challenging. In this article, I examine how modern LLMs perform when tasked with scientific literature review and knowledge synthesis.

## The Growing Need for Automated Literature Review

Scientific knowledge is growing at an unprecedented rate:

- Over 4,000 new papers are published daily
- Researchers struggle to keep up with developments even in narrow fields
- Interdisciplinary insights are often missed due to information overload

This creates an opportunity for AI systems to assist researchers in synthesizing knowledge across large bodies of literature.

## Evaluation Framework

To assess LLM capabilities, I developed a comprehensive evaluation framework covering the following dimensions:

1. **Factual accuracy** - Can the model extract facts correctly from scientific texts?
2. **Context interpretation** - Does the model understand domain-specific terminology?
3. **Temporal awareness** - Can the model track how scientific understanding evolves over time?
4. **Cross-paper synthesis** - Is the model able to identify connections between separate papers?
5. **Limitation awareness** - Does the model acknowledge gaps or contradictions in the literature?

## Experimental Setup

We evaluated several leading LLMs (GPT-4, Claude, PaLM, and others) using a corpus of 500 papers from computational linguistics and NLP conferences from the past decade.

The evaluation included:
- Directed queries about specific findings
- Open-ended synthesis requests
- Comparison of contradictory findings
- Identification of research trends

## Results

Our findings revealed several interesting patterns:

| Model | Factual Accuracy | Synthesis Quality | Limitation Awareness |
|-------|------------------|-------------------|----------------------|
| GPT-4 | 78.5% | High | Moderate |
| Claude | 76.2% | High | High |
| PaLM | 72.1% | Moderate | Low |
| Specialized | 82.3% | Moderate | High |

The most common failure modes included:
- Hallucination of non-existent citations
- Incorrect merging of findings from different studies
- Lack of temporal awareness in evolving research areas

## Conclusion

While current LLMs show promise for supporting scientific literature review, significant challenges remain. Our evaluation suggests that:

1. Models fine-tuned on scientific corpora significantly outperform general models
2. The ability to provide citations and express uncertainty is crucial
3. Domain adaptation remains essential for specialized applications

As these systems improve, they may become valuable tools for researchers dealing with information overload, though human oversight remains essential for ensuring accuracy and proper research synthesis.
      `,
      publishedAt: "2023-09-22T14:15:00Z",
      featured: true
    },
    {
      id: "3",
      title: "Sentiment Analysis for Low-Resource Bengali Social Media Text",
      slug: "sentiment-analysis-bengali-social-media",
      category: "Sentiment Analysis",
      excerpt: "Exploring techniques to improve sentiment analysis for Bengali social media text, addressing challenges like code-mixing, transliteration, and dialectal variations.",
      content: `
# Sentiment Analysis for Low-Resource Bengali Social Media Text

## Introduction

Sentiment analysis is well-established for high-resource languages like English, but faces significant challenges when applied to low-resource languages like Bengali, particularly in informal social media contexts. This article discusses our approach to building robust sentiment analysis for Bengali social media content.

## Unique Challenges in Bengali Social Media Text

Bengali social media text presents several unique challenges:

1. **Code-mixing**: Frequent mixing of Bengali and English (and sometimes Hindi)
2. **Romanized Bengali**: Bengali written using Roman script rather than Bengali script
3. **Regional dialects**: Significant variation between different regional forms of Bengali
4. **Creative expressions**: Novel emoticons, abbreviations, and slang specific to Bengali internet culture
5. **Limited labeled data**: Few high-quality sentiment datasets for Bengali

## Data Collection and Annotation

We created a new dataset comprising:
- 15,000 tweets from Twitter/X
- 8,000 Facebook comments
- 5,000 YouTube comments

Three native Bengali speakers annotated each text with sentiment labels (positive, negative, neutral) and additional markers for dialect, code-mixing level, and transliteration status.

## Model Development

We explored several approaches to overcome the limited data challenge:

### 1. Transfer Learning from Multilingual Models

We fine-tuned XLM-RoBERTa and mBERT with our Bengali sentiment data:

\`\`\`python
from transformers import AutoModelForSequenceClassification, AutoTokenizer

# Load multilingual model
model_name = "xlm-roberta-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=3)

# Fine-tune with Bengali sentiment data
# Training code follows...
\`\`\`

### 2. Data Augmentation for Low-Resource Setting

To address limited data, we implemented:
- Back-translation between Bengali and English
- Transliteration augmentation (Bengali script ↔ Romanized)
- Dialect transformation

### 3. Custom Preprocessing for Bengali Social Media Text

We developed specialized preprocessing for Bengali social media text:

\`\`\`python
def preprocess_bengali_social_media(text):
    # Handle mixed scripts
    text = normalize_script_mixing(text)
    
    # Normalize dialectal variations
    text = standardize_dialectal_forms(text)
    
    # Process Bengali-specific emoticons and expressions
    text = process_bengali_expressions(text)
    
    return text
\`\`\`

## Evaluation Results

Our evaluation compared several approaches:

| Model | Accuracy | F1 Score | Handles Code-Mixing | Handles Transliteration |
|-------|----------|----------|---------------------|-------------------------|
| mBERT baseline | 67.3% | 0.66 | Limited | Poor |
| XLM-R baseline | 72.1% | 0.71 | Moderate | Limited |
| Our full model | 78.5% | 0.77 | Good | Good |

The most significant improvements came from:
1. Custom preprocessing for Bengali social media conventions
2. Data augmentation through transliteration
3. Dialectal normalization

## Conclusion

Sentiment analysis for Bengali social media remains challenging but our approach demonstrates significant improvements over baseline methods. The most critical factors for success were:

1. Addressing script variation and code-mixing explicitly
2. Developing Bengali-specific preprocessing
3. Using data augmentation to compensate for limited labeled data

This work not only improves Bengali sentiment analysis but provides a framework that can be adapted to other low-resource South Asian languages with similar challenges.
      `,
      publishedAt: "2023-07-10T09:45:00Z",
      featured: true
    },
    {
      id: "4",
      title: "Analyzing YouTube Comments with NLP and ML",
      slug: "youtube-comments-nlp-analysis",
      category: "Case Study",
      excerpt: "A case study on how natural language processing and machine learning can extract valuable insights from YouTube comments for content creators and marketers.",
      content: `
# Analyzing YouTube Comments with NLP and ML

## Introduction

YouTube is one of the largest platforms for content consumption and engagement worldwide. The comments section represents a goldmine of user feedback, sentiment, and behavioral insights that can be valuable for content creators, marketers, and researchers. In this case study, I'll walk through a practical application of NLP and ML techniques to extract actionable insights from YouTube comments.

## Project Overview

For a popular educational YouTube channel with over 1M subscribers, we developed a comprehensive comment analysis system that could:

1. Automatically categorize comments by topic and intent
2. Track sentiment trends over time and across video categories
3. Identify potential content ideas based on user questions
4. Flag problematic or toxic comments for moderation
5. Recognize emerging patterns in viewer engagement

## Data Collection

Using the YouTube API, we collected:
- 250,000+ comments from 500 videos
- Associated metadata (timestamps, like counts, etc.)
- Video contextual information (title, description, category)

\`\`\`python
from googleapiclient.discovery import build

# Set up the YouTube API client
api_key = "YOUR_API_KEY"
youtube = build('youtube', 'v3', developerKey=api_key)

def get_video_comments(video_id, max_results=100):
    comments = []
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=max_results
    )
    
    while request:
        response = request.execute()
        
        for item in response['items']:
            comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
            comments.append(comment)
            
        # Check if there are more comments
        if 'nextPageToken' in response:
            request = youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                maxResults=max_results,
                pageToken=response['nextPageToken']
            )
        else:
            break
            
    return comments
\`\`\`

## Comment Classification System

We developed a multi-stage classification pipeline:

### 1. Preprocessing

Comments underwent specialized preprocessing for social media text:
- Emoji interpretation
- Handling of YouTube-specific features (timestamps, @mentions)
- Spelling normalization
- Language detection and filtering

### 2. Topic Classification

We trained a BERT-based classifier to categorize comments into topics relevant to the channel:

\`\`\`python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=len(TOPIC_CATEGORIES))

# Fine-tuning code follows...
\`\`\`

Our topic categories included:
- Content questions
- Technical questions
- Praise/appreciation
- Criticism
- Suggestions
- Off-topic discussion
- Timestamp references

### 3. Sentiment Analysis

We implemented a fine-grained sentiment analysis system that could:
- Detect subtle sentiment nuances beyond positive/negative
- Identify emotional tones (confusion, excitement, frustration)
- Account for YouTube-specific language patterns

### 4. Question Extraction & Clustering

To identify potential content ideas, we:
1. Extracted questions using syntactic patterns
2. Clustered similar questions using semantic similarity
3. Ranked clusters by engagement metrics and frequency

## Key Findings

The system revealed several actionable insights:

1. **Content Timing Impact**: Videos published on Wednesday mornings received 38% more engagement in comments
2. **Confusion Indicators**: Specific sections of videos consistently generated confused comments, indicating opportunities for clearer explanation
3. **Content Request Patterns**: We identified three major topics requested by viewers that weren't covered in existing content
4. **Engagement Drivers**: Videos with practical demonstrations in the first 2 minutes had 2.5x the comment engagement

## Technical Challenges & Solutions

Some notable challenges we faced:

1. **Multilingual Comments**: The channel had a global audience with comments in 20+ languages
   - Solution: Implemented language detection and targeted translation for major languages

2. **Context Dependency**: Many comments referenced specific video moments
   - Solution: Developed timestamp linking to connect comments with video content

3. **Sarcasm & Humor**: Internet language often employs sarcasm and humor that confused sentiment models
   - Solution: Fine-tuned our models on YouTube-specific comment patterns

## Implementation & Integration

The entire system was deployed as a dashboard for the content team:

1. Real-time comment analysis pipeline running on AWS
2. Interactive visualization dashboard for the content team
3. Weekly insight reports highlighting action items
4. Integration with content planning workflow

## Results & Business Impact

After six months of implementation:
- 27% increase in viewer retention
- 43% higher comment engagement
- 32% more efficient content planning process
- Improved moderation reducing problematic comments by 67%

## Conclusion

This case study demonstrates how NLP and ML can transform YouTube comments from unstructured data into strategic insights. The approach combines multiple techniques including classification, clustering, and sentiment analysis to create a comprehensive understanding of audience engagement.

The key lesson is that contextual understanding and domain adaptation are essential - generic NLP models needed significant customization to handle the unique characteristics of YouTube comments.

For organizations looking to implement similar systems, we recommend starting with clear business objectives and focusing on actionable insights rather than complex models.
      `,
      publishedAt: "2023-05-05T16:20:00Z",
      featured: false
    },
    {
      id: "5",
      title: "Building a RAG System with Custom Knowledge Base",
      slug: "building-rag-custom-knowledge-base",
      category: "Gen AI",
      excerpt: "A step-by-step guide to implementing a Retrieval-Augmented Generation (RAG) system for specialized domains with custom knowledge bases.",
      content: `
# Building a RAG System with Custom Knowledge Base

## Introduction

Retrieval-Augmented Generation (RAG) has emerged as one of the most effective approaches for enhancing large language models with domain-specific knowledge. In this article, I'll walk through the process of building a custom RAG system for specialized domains, based on a recent project for a research organization in the linguistics field.

## What is RAG and Why Does it Matter?

RAG combines the strengths of two approaches:
1. **Retrieval**: Finding relevant information from a knowledge base
2. **Generation**: Using that information to generate accurate, contextual responses

This addresses several key limitations of traditional LLMs:
- Hallucination and factual inaccuracies
- Limited or outdated knowledge
- Inability to access proprietary or specialized information

## Project Context

Our client, a linguistic research institute, needed a system that could:
- Answer questions about rare languages and dialects
- Reference their private research papers and field notes
- Support researchers with accurate citations to source materials
- Handle multilingual queries and technical terminology

## Architecture Overview

Our RAG implementation consisted of five main components:

1. **Document Processing Pipeline**
2. **Vector Database**
3. **Retrieval System**
4. **LLM Integration Layer**
5. **Evaluation Framework**

Let's examine each in detail.

## 1. Document Processing Pipeline

\`\`\`python
import os
import re
from langchain.document_loaders import PyPDFLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

def load_and_process_documents(directory_path):
    documents = []
    
    # Walk through directory and process each file
    for root, _, files in os.walk(directory_path):
        for file in files:
            file_path = os.path.join(root, file)
            
            # Process based on file type
            if file.endswith('.pdf'):
                loader = PyPDFLoader(file_path)
                documents.extend(loader.load())
            elif file.endswith('.txt'):
                loader = TextLoader(file_path)
                documents.extend(loader.load())
    
    # Split documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, 
        chunk_overlap=200,
        separators=["\n\n", "\n", ". ", " ", ""]
    )
    
    chunks = text_splitter.split_documents(documents)
    
    # Extract metadata and prepare for embedding
    processed_chunks = []
    for chunk in chunks:
        # Extract citation information
        citation_info = extract_citation_info(chunk)
        
        # Add enhanced metadata
        chunk.metadata.update(citation_info)
        processed_chunks.append(chunk)
    
    return processed_chunks
\`\`\`

Key considerations in our document processing:

1. **Intelligent Chunking**: We used a recursive character splitter that respects natural document boundaries like paragraphs.

2. **Metadata Enrichment**: Each chunk was enriched with:
   - Source information (paper title, authors, year)
   - Page/section references
   - Language and dialect tags
   - Domain classifications

3. **Special Handling for Linguistic Data**: We implemented custom processors for:
   - IPA (International Phonetic Alphabet) symbols
   - Multilingual text
   - Linguistic glosses and annotations

## 2. Vector Database

For our vector database, we chose Pinecone due to its scalability and performance:

\`\`\`python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
import pinecone

# Initialize embedding model
embeddings = OpenAIEmbeddings()

# Initialize Pinecone
pinecone.init(
    api_key=os.environ.get("PINECONE_API_KEY"),
    environment=os.environ.get("PINECONE_ENV")
)

index_name = "linguistics-research"

# Create index if it doesn't exist
if index_name not in pinecone.list_indexes():
    pinecone.create_index(
        name=index_name,
        dimension=1536,  # OpenAI embedding dimension
        metric="cosine"
    )

# Connect to the index
index = pinecone.Index(index_name)

# Create vector store
vectorstore = Pinecone(
    index, embeddings.embed_query, "text"
)

# Embed and store processed documents
vectorstore.add_documents(processed_chunks)
\`\`\`

We chose a hybrid search approach that combines:
- Dense vector embeddings (semantic search)
- Sparse vector representations (keyword matching)

This proved particularly effective for linguistic terminology where exact matching of technical terms was often as important as semantic similarity.

## 3. Retrieval System

Our retrieval system was designed to be context-aware and adaptive:

\`\`\`python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

def get_contextual_retriever(vectorstore, llm):
    # Base retriever
    base_retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 8}
    )
    
    # Document compressor using LLM
    compressor = LLMChainExtractor.from_llm(llm)
    
    # Contextual compression retriever
    retriever = ContextualCompressionRetriever(
        base_compressor=compressor,
        base_retriever=base_retriever
    )
    
    return retriever

def retrieve_relevant_context(query, retriever):
    # Enhance query with domain detection
    enhanced_query = enhance_linguistic_query(query)
    
    # Retrieve documents
    retrieved_docs = retriever.get_relevant_documents(enhanced_query)
    
    # Post-process and rank
    ranked_docs = rank_by_relevance(retrieved_docs, enhanced_query)
    
    return ranked_docs
\`\`\`

Key features of our retrieval system:

1. **Query Enhancement**: We preprocessed user queries to identify linguistic terminology and expanded them with relevant synonyms and related concepts.

2. **Contextual Compression**: Instead of using all retrieved chunks verbatim, we used an LLM to extract the most relevant parts of each document for the specific query.

3. **Re-ranking**: We implemented a custom re-ranking function that considered:
   - Semantic relevance
   - Publication recency
   - Source authority
   - Citation count

## 4. LLM Integration Layer

For our LLM integration, we used a chain that processed both the retrieved context and maintained awareness of the query intent:

\`\`\`python
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI

def create_rag_chain(retriever):
    # Initialize LLM
    llm = ChatOpenAI(
        model_name="gpt-4",
        temperature=0.3
    )
    
    # Conversation memory
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )
    
    # Create chain
    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
        return_source_documents=True
    )
    
    return chain

def generate_response(chain, query):
    # Get response
    response = chain({"question": query})
    
    # Format with citations
    formatted_response = format_with_citations(
        response["answer"], 
        response["source_documents"]
    )
    
    return formatted_response
\`\`\`

Our integration included:

1. **Custom Prompting**: We developed specialized prompts that instructed the LLM how to handle linguistic terminology and properly cite sources.

2. **Source Attribution**: Every claim in the generated response was linked back to its source document, with proper academic citations.

3. **Uncertainty Handling**: The system explicitly acknowledged when information was missing or conflicting in the retrieved documents.

## 5. Evaluation Framework

For ongoing evaluation and improvement, we implemented a comprehensive evaluation system:

\`\`\`python
def evaluate_rag_system(test_queries, ground_truth, chain):
    metrics = {
        "factual_accuracy": [],
        "citation_quality": [],
        "completeness": [],
        "relevance": []
    }
    
    for query, expected in zip(test_queries, ground_truth):
        # Generate response
        response = generate_response(chain, query)
        
        # Evaluate factual accuracy
        accuracy = assess_factual_accuracy(response, expected)
        metrics["factual_accuracy"].append(accuracy)
        
        # Evaluate other metrics
        metrics["citation_quality"].append(assess_citations(response))
        metrics["completeness"].append(assess_completeness(response, expected))
        metrics["relevance"].append(assess_relevance(response, query))
    
    # Compute aggregates
    return {k: sum(v)/len(v) for k, v in metrics.items()}
\`\`\`

Our evaluation focused on:

1. **Factual Accuracy**: Correctness of linguistic information compared to ground truth.

2. **Citation Quality**: Accuracy and appropriateness of citations to source materials.

3. **Completeness**: Whether the response addressed all aspects of the query.

4. **Relevance**: How directly the response answered the user's question.

We maintained a test set of 150 expert-created queries with ground truth answers for continuous evaluation as we updated the system.

## Results and Learnings

After deploying the system, we saw:

1. **Significantly Reduced Hallucination**: Factual accuracy improved from 67% with a standalone LLM to 92% with our RAG system.

2. **Higher Expert Satisfaction**: Linguistic researchers rated the system 4.5/5 for usefulness, compared to 2.8/5 for the baseline LLM.

3. **Key Technical Insights**:
   - Hybrid retrieval outperformed pure vector search for technical linguistic terms
   - Chunk size was critical - we found 800-1000 tokens optimal for our domain
   - Including citation metadata dramatically improved source attribution

## Challenges and Solutions

Some significant challenges we overcame:

1. **Handling Specialized Notation**: Linguistic IPA symbols and glosses required custom preprocessing.
   - Solution: Character-level tokenization and specialized embeddings model fine-tuning.

2. **Contradictory Sources**: Different linguistic theories sometimes presented contradictory information.
   - Solution: Source-grouped retrieval and explicit handling of theoretical differences in prompts.

3. **Cross-lingual Queries**: Users needed to ask questions about languages they didn't speak.
   - Solution: Language detection and specialized embedding spaces for multilingual content.

## Conclusion

Building an effective RAG system for specialized domains like linguistics requires careful attention to:

1. Document processing and chunking strategies
2. Domain-specific retrieval methods
3. Thoughtful LLM integration with proper citation handling
4. Continuous evaluation and refinement

When implemented properly, RAG can transform how specialists interact with their knowledge bases, enabling more accurate and trustworthy AI assistance even in highly technical domains.

For similar projects, we recommend starting with a smaller, high-quality knowledge base and focusing on retrieval quality before scaling up to larger document collections.
      `,
      publishedAt: "2023-03-18T11:10:00Z",
      featured: false
    }
  ]
};

// Export the mock data
const mockData = {
  blogPosts: mockBlogPosts
};

// Make available for browser and Node.js
if (typeof window !== 'undefined') {
  // Browser environment
  window.mockData = mockData;
} else if (typeof module !== 'undefined') {
  // Node.js environment
  module.exports = mockData;
} 