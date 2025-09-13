interface MusicForm {
  genre: string;
  mood: string;
  tempo: string;
  instrumentation: string;
  inspiration: string;
}

interface MusicIdea {
  songIdea: string;
  chordProgression: string;
  melody: string;
  structure: string;
  lyrics: string;
  production: string;
}

const GEMINI_API_KEY = "AIzaSyAw5_d7vYyewOtPVRjC0H94Uc2oUNrvDZE";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function generateMusicIdea(form: MusicForm): Promise<MusicIdea> {
  const prompt = `Create a detailed music idea based on these parameters:

Genre: ${form.genre}
Mood/Theme: ${form.mood}
Tempo: ${form.tempo}
Instrumentation: ${form.instrumentation || "Not specified"}
Extra Inspiration: ${form.inspiration || "None"}

Please provide a structured response with the following sections:

1. **Song Idea**: A vivid description of the overall vibe, feeling, and concept (2-3 sentences)
2. **Chord Progression**: Provide a specific chord progression (e.g., "Am - F - C - G" or "Cmaj7 - Am7 - Dm7 - G7")
3. **Melody Idea**: Describe the melody in plain text - character, movement, key moments (2-3 sentences)
4. **Structure**: Suggest a song structure (e.g., "Intro - Verse - Chorus - Verse - Chorus - Bridge - Chorus - Outro")
5. **Lyrics Snippet**: Write 4-8 lines of sample lyrics that capture the mood and theme
6. **Production Notes**: Specific recommendations for instruments, effects, textures, and production techniques (2-3 sentences)

Format your response exactly like this:

**Song Idea:**
[Your description]

**Chord Progression:**
[Your chord progression]

**Melody Idea:**
[Your melody description]

**Structure:**
[Your structure]

**Lyrics Snippet:**
[Your lyrics]

**Production Notes:**
[Your production notes]

Make it creative, specific, and inspiring for a musician to work with!`;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No content generated');
    }

    // Parse the structured response
    const sections = generatedText.split('**');
    
    const findSection = (sectionName: string): string => {
      const index = sections.findIndex(section => 
        section.trim().toLowerCase().includes(sectionName.toLowerCase())
      );
      if (index !== -1 && sections[index + 1]) {
        return sections[index + 1].replace(/\n+/g, ' ').trim();
      }
      return `Generated ${sectionName.toLowerCase()} content`;
    };

    return {
      songIdea: findSection('Song Idea'),
      chordProgression: findSection('Chord Progression'),
      melody: findSection('Melody Idea'),
      structure: findSection('Structure'),
      lyrics: findSection('Lyrics Snippet'),
      production: findSection('Production Notes'),
    };

  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate music idea');
  }
}