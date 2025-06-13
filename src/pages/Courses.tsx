import React, { useEffect, useState } from "react";
import { Button, Typography, CircularProgress, Box } from "@mui/material";
import toast from "react-hot-toast";

const API = "https://api.z267312-o74cz.ls01.zwhhosting.com";

interface Course {
  id: number;
  title: string;
  category?: string;
  description?: string;
  points_required: number;
  pdf_link: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<any>({});
  const [purchasedCourses, setPurchasedCourses] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(u);
    fetchCourses();
    if (u.id) fetchPurchasedCourses(u.id);
    // eslint-disable-next-line
  }, []);

  const fetchCourses = async () => {
    const res = await fetch(`${API}/get_course.php`);
    const data = await res.json();
    setCourses(data);
    setLoading(false);
  };

  const fetchPurchasedCourses = async (userId: number) => {
    const res = await fetch(`${API}/get_purches_course.php?user_id=${userId}`);
    const data = await res.json();
    setPurchasedCourses(data.map((item: any) => Number(item.course_id)));
  };

  const handleBuyCourse = async (course: Course) => {
    if (user.points < course.points_required) return toast.error("Not enough points.");

    const res = await fetch(`${API}/buy_course.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course_id: course.id, user_id: user.id }),
    });
    const data = await res.json();

    if (data.success) {
      toast.success("Course unlocked!");
      setPurchasedCourses([...purchasedCourses, course.id]);
      const updatedUser = { ...user, points: data.new_points };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } else toast.error(data.error);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        📚 Courses
      </Typography>
      {courses.length === 0 ? (
        <Typography align="center">No courses found.</Typography>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#2c3e50", color: "#fff" }}>
                <th style={{ padding: 8 }}>Title</th>
                <th style={{ padding: 8 }}>Points</th>
                <th style={{ padding: 8 }}>File</th>
                <th style={{ padding: 8 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => {
                const ext = course.pdf_link.split('.').pop()?.toLowerCase();
                const purchased = purchasedCourses.includes(course.id);
                return (
                  <tr key={course.id} style={{ background: "#f8f9fa" }}>
                    <td style={{ padding: 8 }}>{course.title}</td>
                    <td style={{ padding: 8 }}>{course.points_required}</td>
                    <td style={{ padding: 8 }}>
                      {purchased ? (
                        ext === "pdf" ? (
                          <a href={course.pdf_link} target="_blank" rel="noopener noreferrer">
                            📄 View PDF
                          </a>
                        ) : ext === "zip" ? (
                          <a href={course.pdf_link} target="_blank" rel="noopener noreferrer">
                            🗜️ Download ZIP
                          </a>
                        ) : (
                          <span>Unknown</span>
                        )
                      ) : (
                        <span style={{ color: "#aaa" }}>Locked</span>
                      )}
                    </td>
                    <td style={{ padding: 8 }}>
                      {purchased ? (
                        <Button variant="contained" color="success" size="small" disabled>
                          Purchased
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleBuyCourse(course)}
                        >
                          Buy
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
};

export default Courses;