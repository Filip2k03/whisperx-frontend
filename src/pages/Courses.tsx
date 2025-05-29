import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import API from "../api/api";

const courseCategories = ["All", "HTML", "CSS", "JavaScript", "React", "Python", "PHP"];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [user, setUser] = useState<any>({});
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const res = await fetch(`${API}/get_courses.php`);
    const data = await res.json();
    setCourses(data);
    setFiltered(data);
    setLoading(false);
  };

  const handleTabChange = (_: any, newValue: number) => {
    setTab(newValue);
    const cat = courseCategories[newValue];
    if (cat === "All") {
      setFiltered(courses);
    } else {
      setFiltered(courses.filter((c: any) => c.category === cat));
    }
  };

  const refreshPoints = () => {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`${API}/get_user.php?id=${u.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Available Courses</Typography>
        <Button variant="outlined" onClick={refreshPoints}>
          🔄 Refresh Points ({user?.points})
        </Button>
      </Box>

      <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {courseCategories.map((cat, index) => (
          <Tab label={cat} key={index} />
        ))}
      </Tabs>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        filtered.map((course: any) => (
          <Paper key={course.id} sx={{ p: 2, my: 2 }}>
            <Typography variant="h6">{course.title}</Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {course.category}
            </Typography>
            <Typography variant="body1">{course.description}</Typography>
            <Typography>Required Points: {course.points_required}</Typography>
            {user.points >= course.points_required ? (
              <Button variant="contained" href={course.pdf_link} target="_blank">
                Download PDF
              </Button>
            ) : (
              <Typography color="error">Not enough points</Typography>
            )}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Courses;
