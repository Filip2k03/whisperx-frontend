import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  TextField,
  MenuItem,
  Link as MuiLink,
  Chip, // For displaying features as chips
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Server, // General hosting icon
  Code,   // General code icon
  Cloud,  // Cloud icon
  FileCode, // For specific languages
  HardDrive, // Disk space
  Globe, // Custom domains
  ShieldCheck, // SSL
  Database, // MySQL
  Mail, // Email
  Cpu, // Serverless
  GitFork, // Version Control
  Play, // Deployment
  Python, // Python icon
  SquareTerminal, // Node.js icon (or use custom SVG)
  FilePhp, // PHP icon
} from 'lucide-react'; // Import icons from lucide-react

interface HostingProvider {
  id: string;
  name: string;
  description: string;
  features: string[]; // e.g., "PHP", "MySQL", "FTP", "SSL"
  deployLanguages: string[]; // e.g., "Python", "Node.js", "PHP", "Static"
  link: string;
  logo: React.ReactNode; // ReactNode to render LucideIcon or SVG
}

interface DeployOption {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

// Define specific deployment options
const deployOptions: DeployOption[] = [
  { id: "python", name: "Deploy Python", description: "Host your Python web applications and scripts.", path: "/free-hosting/python", icon: <Python size={40} /> },
  { id: "nodejs", name: "Deploy Node.js", description: "Run Node.js backend services and full-stack apps.", path: "/free-hosting/node", icon: <SquareTerminal size={40} /> },
  { id: "php", name: "Deploy PHP", description: "Host traditional PHP websites and applications.", path: "/free-hosting/php", icon: <FilePhp size={40} /> },
  { id: "static", name: "Deploy Static Sites", description: "Host HTML, CSS, JS websites and single-page apps.", path: "/free-hosting/static", icon: <FileCode size={40} /> },
  // Add more as needed, e.g., Java, Ruby, Go, etc.
];


// Dummy data for Free Hosting Providers with logos and deployLanguages
const freeHostingProviders: HostingProvider[] = [
  {
    id: "000webhost",
    name: "000webhost",
    description: "Free web hosting with PHP, MySQL, and no ads. Part of Hostinger.",
    features: ["PHP", "MySQL", "cPanel", "No Ads", "1 GB Disk", "10 GB Bandwidth"],
    deployLanguages: ["PHP"],
    link: "https://www.000webhost.com/",
    logo: <Server size={40} color="#FF5722" />,
  },
  {
    id: "infinityfree",
    name: "InfinityFree",
    description: "Completely free web hosting with unlimited disk space and bandwidth.",
    features: ["Unlimited Disk", "Unlimited Bandwidth", "PHP", "MySQL", "cPanel", "Free SSL"],
    deployLanguages: ["PHP"],
    link: "https://infinityfree.net/",
    logo: <Cloud size={40} color="#4CAF50" />,
  },
  {
    id: "netlify",
    name: "Netlify (Free Tier)",
    description: "Modern web development platform for static sites and JAMstack apps.",
    features: ["Static Sites", "CI/CD", "SSL", "Custom Domains", "Serverless Functions"],
    deployLanguages: ["Static", "Node.js"], // Netlify functions support Node.js
    link: "https://www.netlify.com/",
    logo: <img src="https://www.netlify.com/v3/img/components/logomark-light.svg" alt="Netlify Logo" style={{ height: 40, width: 40 }} />, // External image for logo
  },
  {
    id: "vercel",
    name: "Vercel (Free Tier)",
    description: "Platform for frontend developers, providing automatic deployments for static sites and serverless functions.",
    features: ["Static Sites", "Serverless", "Automatic Deployment", "SSL", "Custom Domains"],
    deployLanguages: ["Static", "Node.js", "Python"], // Vercel functions support Node.js, Python
    link: "https://vercel.com/",
    logo: <img src="https://assets.vercel.com/image/upload/v1662175225/front/assets/logotypes/vercel.svg" alt="Vercel Logo" style={{ height: 40, width: 40 }} />, // External image for logo
  },
  {
    id: "github-pages",
    name: "GitHub Pages",
    description: "Host static websites directly from your GitHub repository.",
    features: ["Static Sites", "Custom Domains", "SSL", "Version Control Integration"],
    deployLanguages: ["Static"],
    link: "https://pages.github.com/",
    logo: <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" style={{ height: 40, width: 40 }} />, // External image for logo
  },
  {
    id: "firebase-hosting",
    name: "Firebase Hosting (Free Tier)",
    description: "Fast and secure static hosting for your web apps, with global CDN.",
    features: ["Static Sites", "CDN", "SSL", "Custom Domains", "Serverless (with Cloud Functions)"],
    deployLanguages: ["Static", "Node.js", "Python"], // Cloud Functions support Node.js, Python
    link: "https://firebase.google.com/docs/hosting",
    logo: <img src="https://www.gstatic.com/devrel-devsite/prod/vc398e82b7b054238e553303102434b9d5c31742403612d7d9f7823f66b2a8d3e/firebase/images/touchicon-180.png" alt="Firebase Logo" style={{ height: 40, width: 40 }} />, // External image for logo
  },
  {
    id: "heroku",
    name: "Heroku (Free Tier)",
    description: "Cloud platform as a service (PaaS) supporting several programming languages.",
    features: ["Node.js", "Python", "Ruby", "Java", "PHP", "PostgreSQL (limited)"],
    deployLanguages: ["Node.js", "Python", "PHP"],
    link: "https://www.heroku.com/free",
    logo: <img src="https://www.herokucdn.com/favicon.ico" alt="Heroku Logo" style={{ height: 40, width: 40 }} />, // External image for logo
  },
  {
    id: "glitch",
    name: "Glitch",
    description: "Collaborative platform for building and deploying web apps.",
    features: ["Node.js", "Express", "Live Reload", "Collaboration", "Remixable Projects"],
    deployLanguages: ["Node.js"],
    link: "https://glitch.com/",
    logo: <Code size={40} color="#FF00FF" />,
  },
  {
    id: "render-free",
    name: "Render (Free Tier)",
    description: "Unified platform for building and running all your apps and websites.",
    features: ["Static Sites", "Web Services", "Databases (limited)", "Free SSL"],
    deployLanguages: ["Static", "Node.js", "Python", "PHP"], // Render supports many languages
    link: "https://render.com/pricing",
    logo: <Cloud size={40} color="#673AB7" />,
  },
  {
    id: "surge-sh",
    name: "Surge.sh",
    description: "Static web publishing for front-end developers.",
    features: ["Static Sites", "CLI Deployment", "Custom Domains", "SSL"],
    deployLanguages: ["Static"],
    link: "https://surge.sh/",
    logo: <Play size={40} color="#00BCD4" />,
  },
  {
    id: "byet-host",
    name: "ByetHost",
    description: "Free hosting with cPanel, PHP, MySQL, and 5.5 GB disk space.",
    features: ["PHP", "MySQL", "cPanel", "5.5 GB Disk", "FTP", "Email Accounts"],
    deployLanguages: ["PHP"],
    link: "https://www.byet.host/",
    logo: <Server size={40} color="#FFC107" />,
  },
  {
    id: "awardspace",
    name: "AwardSpace (Free Plan)",
    description: "Free web hosting with PHP, MySQL, and 1 GB disk space.",
    features: ["PHP", "MySQL", "1 GB Disk", "Email", "Website Builder"],
    deployLanguages: ["PHP"],
    link: "https://www.awardspace.com/",
    logo: <HardDrive size={40} color="#E91E63" />,
  },
  {
    id: "hostinger-free",
    name: "Hostinger (Free Hosting)",
    description: "Offers free web hosting through its 000webhost brand.",
    features: ["PHP", "MySQL", "Website Builder", "FTP"],
    deployLanguages: ["PHP"],
    link: "https://www.hostinger.com/free-web-hosting",
    logo: <Globe size={40} color="#03A9F4" />,
  },
  {
    id: "freehostia",
    name: "FreeHostia (Chocolate Plan)",
    description: "Free cloud hosting with 250 MB disk space and 6 GB bandwidth.",
    features: ["PHP", "MySQL", "250 MB Disk", "Email", "Website Builder"],
    deployLanguages: ["PHP"],
    link: "https://www.freehostia.com/",
    logo: <Cloud size={40} color="#9C27B0" />,
  },
  {
    id: "freenom-world",
    name: "Freenom World (with Hosting)",
    description: "Offers free domains (.tk, .ml, .ga, .cf, .gq) and partners for free hosting.",
    features: ["Free Domains", "Partner Hosting", "DNS Management"],
    deployLanguages: ["Static"], // Primarily for domains, hosting via partners
    link: "https://www.freenom.com/en/freehosting.html",
    logo: <Globe size={40} color="#795548" />,
  },
];

const allHostingFeatures = ["All", ...Array.from(new Set(freeHostingProviders.flatMap(p => p.features)))].sort();
const allDeployLanguages = ["All", ...Array.from(new Set(freeHostingProviders.flatMap(p => p.deployLanguages)))].sort();


const FreeHosting = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All"); // New state for language filter
  const [filteredProviders, setFilteredProviders] = useState<HostingProvider[]>(freeHostingProviders);

  useEffect(() => {
    let currentFiltered = freeHostingProviders;

    if (selectedFeature !== "All") {
      currentFiltered = currentFiltered.filter(provider => provider.features.includes(selectedFeature));
    }

    if (selectedLanguage !== "All") {
      currentFiltered = currentFiltered.filter(provider => provider.deployLanguages.includes(selectedLanguage));
    }

    if (searchTerm) {
      currentFiltered = currentFiltered.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase())) ||
        provider.deployLanguages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredProviders(currentFiltered);
  }, [searchTerm, selectedFeature, selectedLanguage]);

  const handleGoToProvider = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        ☁️ Free Hosting Providers
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A curated list of platforms offering free tiers for web hosting and app deployment.
      </Typography>

      {/* Deploy by Language Section */}
      <Typography variant="h5" sx={{ mt: 5, mb: 3, fontWeight: 'bold', color: '#333' }}>
        🚀 Deploy by Language
      </Typography>
      <Grid container spacing={3} mb={5}>
        {deployOptions.map((option) => (
          <Grid item xs={12} sm={6} md={3} key={option.id}>
            <Card
              elevation={4}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                borderRadius: '16px',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.03)', // More pronounced lift
                  boxShadow: '0 12px 20px rgba(0,0,0,0.25)', // Stronger shadow
                  cursor: 'pointer',
                },
                backgroundColor: '#f5f5f5', // Light background for these cards
                color: '#333',
              }}
              onClick={() => navigate(option.path)}
            >
              <Box sx={{ mb: 1, color: '#1976d2' }}>{option.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {option.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.85rem' }}>
                {option.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>


      {/* Search and Filter Section */}
      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <TextField
          label="Search Hosting"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <TextField
          select
          label="Features"
          variant="outlined"
          value={selectedFeature}
          onChange={(e) => setSelectedFeature(e.target.value)}
          sx={{ width: '180px' }}
        >
          {allHostingFeatures.map((feature) => (
            <MenuItem key={feature} value={feature}>
              {feature}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Language"
          variant="outlined"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          sx={{ width: '180px' }}
        >
          {allDeployLanguages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Hosting Providers Grid */}
      <Grid container spacing={3}>
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={provider.id}>
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ mr: 1 }}>{provider.logo}</Box>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#1976d2', fontWeight: 'bold', flexGrow: 1 }}>
                      {provider.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: '60px' }}>
                    {provider.description}
                  </Typography>
                  <Box sx={{ mt: 2, minHeight: '40px' }}> {/* Min height for consistent feature display */}
                    {provider.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5, backgroundColor: '#e0e0e0', color: '#555' }}
                      />
                    ))}
                  </Box>
                  {provider.deployLanguages.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.disabled" sx={{ display: 'block', fontWeight: 'bold' }}>
                        Supports:
                      </Typography>
                      {provider.deployLanguages.map((lang, index) => (
                        <Chip
                          key={index}
                          label={lang}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleGoToProvider(provider.link)}
                    sx={{
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#1565c0' },
                      borderRadius: '8px',
                      padding: '8px 16px'
                    }}
                  >
                    Visit Site
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center', mt: 3 }}>
              <Typography variant="h6" color="text.secondary">
                No free hosting providers found matching your criteria.
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

export default FreeHosting;
