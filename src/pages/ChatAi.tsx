import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField, // For search/filter
  MenuItem,  // For category filter
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Dummy data for 100 AI Tools (categorized)
interface AiTool {
  id: string;
  name: string;
  description: string;
  category: string; // e.g., "Chat", "Image", "Video", "Audio", "Writing", "Code", "Research"
  link: string; // External link or internal route
}

const allAiTools: AiTool[] = [
  { id: "chatgpt", name: "ChatGPT", description: "Advanced conversational AI.", category: "Chat", link: "https://chat.openai.com/" },
  { id: "gemini", name: "Gemini", description: "Google's powerful multimodal AI.", category: "Chat", link: "https://gemini.google.com/" },
  { id: "claude", name: "Claude", description: "AI assistant by Anthropic.", category: "Chat", link: "https://claude.ai/" },
  { id: "perplexity-ai", name: "Perplexity AI", description: "AI search engine for answers.", category: "Chat", link: "https://www.perplexity.ai/" },
  { id: "character-ai", name: "Character AI", description: "Create and chat with AI characters.", category: "Chat", link: "https://beta.character.ai/" },
  { id: "bard", name: "Bard (Legacy)", description: "Google's experimental conversational AI.", category: "Chat", link: "https://bard.google.com/" },
  { id: "you-chat", name: "YouChat", description: "AI assistant integrated with You.com search.", category: "Chat", link: "https://you.com/chat" },
  { id: "bolt-ai-chat", name: "Bolt AI Chat", description: "Your custom or integrated Bolt AI solution.", category: "Chat", link: "/bolt-ai-chat" },
  { id: "dall-e", name: "DALL·E", description: "Generates images from text prompts.", category: "Image", link: "https://openai.com/dall-e-2/" },
  { id: "midjourney", name: "Midjourney", description: "AI art generator for stunning visuals.", category: "Image", link: "https://www.midjourney.com/" },
  { id: "stable-diffusion", name: "Stable Diffusion", description: "Open-source text-to-image model.", category: "Image", link: "https://stability.ai/stable-diffusion/" },
  { id: "adobe-firefly", name: "Adobe Firefly", description: "Generative AI for creative workflows.", category: "Image", link: "https://www.adobe.com/sensei/generative-ai/firefly.html" },
  { id: "runwayml", name: "RunwayML Gen-1/Gen-2", description: "AI video generation and editing.", category: "Video", link: "https://runwayml.com/" },
  { id: "synthesys", name: "Synthesys", description: "AI video creation with avatars.", category: "Video", link: "https://synthesys.io/" },
  { id: "heygen", name: "HeyGen", description: "AI video generator for talking avatars.", category: "Video", link: "https://www.heygen.com/" },
  { id: "descript", name: "Descript", description: "AI-powered video and podcast editing.", category: "Video", link: "https://www.descript.com/" },
  { id: "elevenlabs", name: "ElevenLabs", description: "Realistic AI voice generation.", category: "Audio", link: "https://elevenlabs.io/" },
  { id: "aiva", name: "AIVA", description: "AI music composer.", category: "Audio", link: "https://www.aiva.ai/" },
  { id: "soundraw", name: "Soundraw", description: "AI music generator for various moods.", category: "Audio", link: "https://soundraw.io/" },
  { id: "murf-ai", name: "Murf AI", description: "Text-to-speech with natural-sounding voices.", category: "Audio", link: "https://murf.ai/" },
  { id: "jasper", name: "Jasper AI", description: "AI writing assistant for content creation.", category: "Writing", link: "https://www.jasper.ai/" },
  { id: "copy-ai", name: "Copy.ai", description: "AI-powered copywriting tool.", category: "Writing", link: "https://www.copy.ai/" },
  { id: "rytr", name: "Rytr", description: "AI writing assistant for various content types.", category: "Writing", link: "https://rytr.me/" },
  { id: "grammarly", name: "Grammarly (AI features)", description: "Writing assistant with AI suggestions.", category: "Writing", link: "https://www.grammarly.com/" },
  { id: "github-copilot", name: "GitHub Copilot", description: "AI pair programmer for code suggestions.", category: "Code", link: "https://github.com/features/copilot" },
  { id: "tabnine", name: "Tabnine", description: "AI code completion tool.", category: "Code", link: "https://www.tabnine.com/" },
  { id: "replit-ghostwriter", name: "Replit Ghostwriter", description: "AI coding assistant in Replit.", category: "Code", link: "https://replit.com/site/ghostwriter" },
  { id: "alphafold", name: "AlphaFold", description: "Predicts protein structures.", category: "Research", link: "https://www.deepmind.com/research/highlighted-research/alphafold" },
  { id: "eureqa", name: "Eureqa", description: "Symbolic regression for data modeling.", category: "Research", link: "https://www.nutonian.com/products/eureqa/" },
  { id: "synthesia", name: "Synthesia", description: "AI video generation from text.", category: "Video", link: "https://www.synthesia.io/" },
  { id: "pictory", name: "Pictory AI", description: "Creates short, highly shareable brand videos from long content.", category: "Video", link: "https://pictory.ai/" },
  { id: "invideo-ai", name: "InVideo AI", description: "AI-powered online video editor.", category: "Video", link: "https://invideo.io/" },
  { id: "lumen5", name: "Lumen5", description: "Turns text into video with AI.", category: "Video", link: "https://lumen5.com/" },
  { id: "deepmotion", name: "DeepMotion", description: "AI motion capture from video.", category: "Video", link: "https://www.deepmotion.com/" },
  { id: "fliki", name: "Fliki", description: "Text to video and text to speech with AI voices.", category: "Video", link: "https://fliki.ai/" },
  { id: "veed-io", name: "Veed.io (AI features)", description: "Online video editor with AI tools.", category: "Video", link: "https://www.veed.io/" },
  { id: "adobe-podcast", name: "Adobe Podcast (AI features)", description: "AI audio enhancement for podcasts.", category: "Audio", link: "https://podcast.adobe.com/enhance" },
  { id: "krisp", name: "Krisp", description: "AI-powered noise cancellation.", category: "Audio", link: "https://krisp.ai/" },
  { id: "descript-audio", name: "Descript (Audio)", description: "AI-powered audio editing.", category: "Audio", link: "https://www.descript.com/" },
  { id: "amper-music", name: "Amper Music", description: "AI music creation platform.", category: "Audio", link: "https://www.ampermusic.com/" },
  { id: "juke-deck", name: "Jukebox (OpenAI)", description: "Generates music with vocals.", category: "Audio", link: "https://openai.com/blog/jukebox/" },
  { id: "mubert", name: "Mubert", description: "AI music for content creators.", category: "Audio", link: "https://mubert.com/" },
  { id: "lovo-ai", name: "LOVO AI", description: "AI voice generator and text-to-speech.", category: "Audio", link: "https://www.lovo.ai/" },
  { id: "play-ht", name: "Play.ht", description: "AI voice generator and realistic text-to-speech.", category: "Audio", link: "https://play.ht/" },
  { id: "article-forge", name: "Article Forge", description: "AI article writer.", category: "Writing", link: "https://articleforge.com/" },
  { id: "surfer-seo", name: "Surfer SEO (AI features)", description: "Content optimization with AI.", category: "Writing", link: "https://surferseo.com/" },
  { id: "closerscopy", name: "ClosersCopy", description: "AI copywriting software.", category: "Writing", link: "https://closerscopy.com/" },
  { id: "writesonic", name: "Writesonic", description: "AI writer and content generator.", category: "Writing", link: "https://writesonic.com/" },
  { id: "wordtune", name: "Wordtune", description: "AI writing companion for rephrasing.", category: "Writing", link: "https://www.wordtune.com/" },
  { id: "quillbot", name: "QuillBot", description: "AI paraphraser and summarizer.", category: "Writing", link: "https://quillbot.com/" },
  { id: "ai-writer", name: "AI Writer", description: "Generates articles from a headline.", category: "Writing", link: "https://ai-writer.com/" },
  { id: "copysmith", name: "Copysmith", description: "AI content creation for e-commerce.", category: "Writing", link: "https://copysmith.ai/" },
  { id: "contentbot-ai", name: "ContentBot.ai", description: "AI writer for marketing content.", category: "Writing", link: "https://contentbot.ai/" },
  { id: "codium-ai", name: "CodiumAI", description: "Tests code with AI.", category: "Code", link: "https://www.codium.ai/" },
  { id: "mutable-ai", name: "Mutable.ai", description: "AI for rapid software development.", category: "Code", link: "https://mutable.ai/" },
  { id: "deepcode", name: "DeepCode (now Snyk Code)", description: "AI static code analysis.", category: "Code", link: "https://snyk.io/product/snyk-code/" },
  { id: "openai-codex", name: "OpenAI Codex", description: "Translates natural language to code.", category: "Code", link: "https://openai.com/blog/openai-codex/" },
  { id: "kore-ai", name: "Kore.ai", description: "Enterprise conversational AI platform.", category: "Chat", link: "https://kore.ai/" },
  { id: "dialogflow", name: "Dialogflow", description: "Google's conversational AI platform.", category: "Chat", link: "https://cloud.google.com/dialogflow" },
  { id: "watson-assistant", name: "IBM Watson Assistant", description: "Builds AI-powered chatbots.", category: "Chat", link: "https://www.ibm.com/cloud/watson-assistant/" },
  { id: "rasa", name: "Rasa", description: "Open-source conversational AI framework.", category: "Chat", link: "https://rasa.com/" },
  { id: "manychat", name: "ManyChat (AI features)", description: "Chatbot builder for Messenger, Instagram, WhatsApp.", category: "Chat", link: "https://manychat.com/" },
  { id: "chatfuel", name: "Chatfuel (AI features)", description: "AI chatbot platform for Messenger.", category: "Chat", link: "https://chatfuel.com/" },
  { id: "crisp-chat", name: "Crisp (AI features)", description: "Customer messaging with AI chatbot.", category: "Chat", link: "https://crisp.chat/" },
  { id: "tidio", name: "Tidio (AI features)", description: "Live chat and chatbot platform.", category: "Chat", link: "https://www.tidio.com/" },
  { id: "intercom-ai", name: "Intercom (AI features)", description: "Customer messaging with AI.", category: "Chat", link: "https://www.intercom.com/" },
  { id: "freshchat-ai", name: "Freshchat (AI features)", description: "Customer support with AI chatbots.", category: "Chat", link: "https://www.freshworks.com/freshchat/" },
  { id: "drift-ai", name: "Drift (AI features)", description: "Conversational marketing platform.", category: "Chat", link: "https://www.drift.com/" },
  { id: "tome-ai", name: "Tome AI", description: "Generative storytelling with AI.", category: "Presentation", link: "https://tome.app/" },
  { id: "gamma-app", name: "Gamma App", description: "AI-powered presentations.", category: "Presentation", link: "https://gamma.app/" },
  { id: "beautiful-ai", name: "Beautiful.ai", description: "AI presentation maker.", category: "Presentation", link: "https://www.beautiful.ai/" },
  { id: "gong-io", name: "Gong.io", description: "Revenue intelligence platform with AI.", category: "Sales", link: "https://www.gong.io/" },
  { id: "salesforce-einstein", name: "Salesforce Einstein", description: "AI for CRM and sales.", category: "Sales", link: "https://www.salesforce.com/products/einstein/" },
  { id: "zoominfo", name: "ZoomInfo (AI features)", description: "Go-to-market intelligence with AI.", category: "Sales", link: "https://www.zoominfo.com/" },
  { id: "clearbit", name: "Clearbit (AI features)", description: "B2B data and intelligence.", category: "Sales", link: "https://clearbit.com/" },
  { id: "apollo-io", name: "Apollo.io (AI features)", description: "Sales engagement platform.", category: "Sales", link: "https://www.apollo.io/" },
  { id: "outreach-io", name: "Outreach.io (AI features)", description: "Sales engagement and intelligence.", category: "Sales", link: "https://www.outreach.io/" },
  { id: "seamless-ai", name: "Seamless.AI", description: "Finds verified B2B contacts and companies.", category: "Sales", link: "https://www.seamless.ai/" },
  { id: "algolia", name: "Algolia (AI features)", description: "AI-powered search and discovery.", category: "Search", link: "https://www.algolia.com/" },
  { id: "elastic-search", name: "Elasticsearch (AI features)", description: "Distributed search and analytics engine.", category: "Search", link: "https://www.elastic.co/elasticsearch/" },
  { id: "lucidchart-ai", name: "Lucidchart (AI features)", description: "Visual workspace with AI diagramming.", category: "Diagramming", link: "https://www.lucidchart.com/" },
  { id: "miro-ai", name: "Miro (AI features)", description: "Online collaborative whiteboard with AI.", category: "Collaboration", link: "https://miro.com/" },
  { id: "notion-ai", name: "Notion AI", description: "AI writing and productivity tool within Notion.", category: "Productivity", link: "https://www.notion.so/product/ai" },
  { id: "microsoft-copilot", name: "Microsoft Copilot", description: "AI assistant across Microsoft 365 apps.", category: "Productivity", link: "https://www.microsoft.com/en-us/microsoft-copilot" },
  { id: "google-workspace-ai", name: "Google Workspace AI", description: "AI features across Google Docs, Sheets, etc.", category: "Productivity", link: "https://workspace.google.com/ai/" },
  { id: "zapier-ai", name: "Zapier (AI features)", description: "Automates workflows with AI.", category: "Automation", link: "https://zapier.com/ai" },
  { id: "make-com-ai", name: "Make.com (AI features)", description: "Visual platform for workflow automation.", category: "Automation", link: "https://www.make.com/" },
  { id: "ifttt-ai", name: "IFTTT (AI features)", description: "Connects apps and devices with AI.", category: "Automation", link: "https://ifttt.com/" },
  { id: "adobe-photoshop-ai", name: "Adobe Photoshop (AI features)", description: "Image editing with generative fill.", category: "Image", link: "https://www.adobe.com/products/photoshop/generative-fill.html" },
  { id: "canva-magic-studio", name: "Canva Magic Studio", description: "AI design tools in Canva.", category: "Design", link: "https://www.canva.com/magic-studio/" },
  { id: "figma-ai", name: "Figma (AI plugins)", description: "Design tool with AI plugins.", category: "Design", link: "https://www.figma.com/" },
  { id: "autodesk-ai", name: "Autodesk (AI features)", description: "AI for CAD and design.", category: "Design", link: "https://www.autodesk.com/solutions/generative-design" },
  { id: "midjourney-v5", name: "Midjourney V5", description: "Latest version of Midjourney AI art generator.", category: "Image", link: "https://www.midjourney.com/" },
  { id: "leonardo-ai", name: "Leonardo AI", description: "Generative AI for game assets and art.", category: "Image", link: "https://leonardo.ai/" },
  { id: "getimg-ai", name: "Getimg.ai", description: "AI image generation and editing suite.", category: "Image", link: "https://getimg.ai/" },
  { id: "clipdrop", name: "Clipdrop", description: "AI tools for creators, including image upscaling and cleanup.", category: "Image", link: "https://clipdrop.co/" },
  { id: "remove-bg", name: "Remove.bg", description: "Removes image backgrounds with AI.", category: "Image", link: "https://www.remove.bg/" },
  { id: "upscale-media", name: "Upscale.media", description: "AI image upscaler.", category: "Image", link: "https://www.upscale.media/" },
  { id: "deep-dream-generator", name: "Deep Dream Generator", description: "Transforms images using AI.", category: "Image", link: "https://deepdreamgenerator.com/" },
  { id: "artbreeder", name: "Artbreeder", description: "Generates and modifies images with AI.", category: "Image", link: "https://www.artbreeder.com/" },
  { id: "this-person-does-not-exist", name: "This Person Does Not Exist", description: "Generates realistic fake faces.", category: "Image", link: "https://thispersondoesnotexist.com/" },
  { id: "namecheap-ai-logo-maker", name: "Namecheap AI Logo Maker", description: "Creates logos with AI.", category: "Design", link: "https://www.namecheap.com/logo-maker/ai/" },
  { id: "looka", name: "Looka", description: "AI-powered logo maker.", category: "Design", link: "https://looka.com/" },
  { id: "brandmark-io", name: "Brandmark.io", description: "AI logo design tool.", category: "Design", link: "https://brandmark.io/" },
  { id: "uizard", name: "Uizard", description: "AI-powered UI design tool.", category: "Design", link: "https://uizard.com/" },
  { id: "adobe-premiere-pro-ai", name: "Adobe Premiere Pro (AI features)", description: "Video editing with AI tools.", category: "Video", link: "https://www.adobe.com/products/premiere/ai-features.html" },
  { id: "davinci-resolve-ai", name: "DaVinci Resolve (AI features)", description: "Professional video editing with AI.", category: "Video", link: "https://www.blackmagicdesign.com/products/davinciresolve/" },
  { id: "capcut-ai", name: "CapCut (AI features)", description: "Mobile video editor with AI effects.", category: "Video", link: "https://www.capcut.com/" },
  { id: "filmora-ai", name: "Filmora (AI features)", description: "Easy-to-use video editor with AI tools.", category: "Video", link: "https://filmora.wondershare.com/" },
  { id: "runway-ml-video", name: "RunwayML (Video)", description: "AI video generation and editing.", category: "Video", link: "https://runwayml.com/" },
  { id: "deepfake-ai", name: "Deepfake AI (Various)", description: "Generates realistic fake videos.", category: "Video", link: "https://en.wikipedia.org/wiki/Deepfake" },
  { id: "descript-video", name: "Descript (Video)", description: "AI-powered video editing.", category: "Video", link: "https://www.descript.com/" },
  { id: "flexclip-ai", name: "FlexClip (AI features)", description: "Online video maker with AI.", category: "Video", link: "https://www.flexclip.com/" },
  { id: "vidyo-ai", name: "Vidyo.ai", description: "Turns long videos into short clips with AI.", category: "Video", link: "https://vidyo.ai/" },
  { id: "lovo-ai-video", name: "LOVO AI (Video)", description: "AI video creation with voiceovers.", category: "Video", link: "https://www.lovo.ai/video" },
  { id: "deepmind-alphago", name: "DeepMind AlphaGo", description: "AI that mastered the game of Go.", category: "Gaming/Research", link: "https://deepmind.google/technologies/alphago/" },
  { id: "openai-five", name: "OpenAI Five", description: "AI that played Dota 2 at a professional level.", category: "Gaming/Research", link: "https://openai.com/blog/openai-five/" },
  { id: "google-deepmind", name: "Google DeepMind", description: "Leading AI research lab.", category: "Research", link: "https://deepmind.google/" },
  { id: "openai-research", name: "OpenAI Research", description: "Leading AI research organization.", category: "Research", link: "https://openai.com/research" },
  { id: "hugging-face", name: "Hugging Face", description: "Platform for NLP and AI models.", category: "Research/Dev", link: "https://huggingface.co/" },
  { id: "kaggle", name: "Kaggle (AI competitions)", description: "Platform for data science and AI competitions.", category: "Research/Dev", link: "https://www.kaggle.com/" },
  { id: "tensor-flow", name: "TensorFlow", description: "Open-source machine learning framework.", category: "Dev Tools", link: "https://www.tensorflow.org/" },
  { id: "pytorch", name: "PyTorch", description: "Open-source machine learning framework.", category: "Dev Tools", link: "https://pytorch.org/" },
  { id: "keras", name: "Keras", description: "High-level neural networks API.", category: "Dev Tools", link: "https://keras.io/" },
  { id: "scikit-learn", name: "Scikit-learn", description: "Machine learning library for Python.", category: "Dev Tools", link: "https://scikit-learn.org/" },
  { id: "fast-ai", name: "fast.ai", description: "Deep learning library.", category: "Dev Tools", link: "https://www.fast.ai/" },
  { id: "colab", name: "Google Colab", description: "Cloud-based Jupyter notebooks for ML.", category: "Dev Tools", link: "https://colab.research.google.com/" },
  { id: "jupyter", name: "Jupyter Notebook", description: "Interactive computing environment.", category: "Dev Tools", link: "https://jupyter.org/" },
  { id: "datarobot", name: "DataRobot", description: "Automated machine learning platform.", category: "ML Platform", link: "https://www.datarobot.com/" },
  { id: "h2o-ai", name: "H2O.ai", description: "Open-source AI and machine learning platform.", category: "ML Platform", link: "https://h2o.ai/" },
  { id: "aws-sagemaker", name: "AWS SageMaker", description: "Machine learning service by AWS.", category: "ML Platform", link: "https://aws.amazon.com/sagemaker/" },
  { id: "azure-ml", name: "Azure Machine Learning", description: "Cloud-based ML service by Microsoft.", category: "ML Platform", link: "https://azure.microsoft.com/en-us/services/machine-learning/" },
  { id: "google-cloud-ai-platform", name: "Google Cloud AI Platform", description: "ML services by Google Cloud.", category: "ML Platform", link: "https://cloud.google.com/ai-platform" },
  { id: "nvidia-ai", name: "NVIDIA AI", description: "AI computing platforms and software.", category: "Hardware/Software", link: "https://www.nvidia.com/en-us/deep-learning-ai/" },
  { id: "intel-ai", name: "Intel AI", description: "AI solutions and hardware by Intel.", category: "Hardware/Software", link: "https://www.intel.com/content/www/us/en/artificial-intelligence/overview.html" },
  { id: "ibm-ai", name: "IBM AI", description: "Enterprise AI solutions.", category: "Enterprise AI", link: "https://www.ibm.com/artificial-intelligence" },
  { id: "salesforce-ai", name: "Salesforce AI", description: "AI for CRM.", category: "Enterprise AI", link: "https://www.salesforce.com/products/einstein/" },
  { id: "oracle-ai", name: "Oracle AI", description: "AI services for enterprise.", category: "Enterprise AI", link: "https://www.oracle.com/artificial-intelligence/" },
  { id: "sap-ai", name: "SAP AI", description: "AI solutions for business processes.", category: "Enterprise AI", link: "https://www.sap.com/products/artificial-intelligence.html" },
  { id: "microsoft-ai", name: "Microsoft AI", description: "AI tools and services from Microsoft.", category: "Enterprise AI", link: "https://www.microsoft.com/en-us/ai" },
  { id: "dataiku", name: "Dataiku", description: "Everyday AI platform for data science.", category: "Data Science", link: "https://www.dataiku.com/" },
  { id: "domino-data-lab", name: "Domino Data Lab", description: "Data science platform.", category: "Data Science", link: "https://www.dominodatalab.com/" },
  { id: "alteryx", name: "Alteryx (AI features)", description: "Analytics automation platform.", category: "Data Science", link: "https://www.alteryx.com/" },
  { id: "tableau-ai", name: "Tableau (AI features)", description: "Data visualization with AI insights.", category: "Data Science", link: "https://www.tableau.com/solutions/ai" },
  { id: "power-bi-ai", name: "Power BI (AI features)", description: "Business intelligence with AI.", category: "Data Science", link: "https://powerbi.microsoft.com/en-us/features/ai-insights/" },
  { id: "qlik-ai", name: "Qlik (AI features)", description: "Data analytics platform with AI.", category: "Data Science", link: "https://www.qlik.com/us/products/ai-and-machine-learning" },
];


const allCategories = ["All", ...Array.from(new Set(allAiTools.map(tool => tool.category)))].sort();

const ChatAi = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredTools, setFilteredTools] = useState<AiTool[]>(allAiTools);

  useEffect(() => {
    let currentFiltered = allAiTools;

    if (selectedCategory !== "All") {
      currentFiltered = currentFiltered.filter(tool => tool.category === selectedCategory);
    }

    if (searchTerm) {
      currentFiltered = currentFiltered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTools(currentFiltered);
  }, [searchTerm, selectedCategory]);

  const handleGoToTool = (link: string) => {
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        🚀 Explore AI Tools
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Discover a wide range of Artificial Intelligence tools across various categories.
      </Typography>

      {/* Search and Filter Section */}
      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <TextField
          label="Search AI Tools"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <TextField
          select
          label="Category"
          variant="outlined"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ width: '180px' }}
        >
          {allCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* AI Tools Grid */}
      <Grid container spacing={3}>
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tool.id}> {/* Responsive grid */}
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  }
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {tool.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: '40px' }}> {/* Min height for consistent card size */}
                    {tool.description}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                    Category: {tool.category}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleGoToTool(tool.link)}
                    sx={{
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#1565c0' },
                      borderRadius: '8px',
                      padding: '8px 16px'
                    }}
                  >
                    Go to Tool
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center', mt: 3 }}>
              <Typography variant="h6" color="text.secondary">
                No AI tools found matching your criteria.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default ChatAi;
