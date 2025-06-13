import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import toast from "react-hot-toast";

const API = "https://api.z267312-o74cz.ls01.zwhhosting.com/";

interface Course {
  id: number;
  title: string;
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
    fetchPurchasedCourses(u.id);
  }, []);

  const fetchCourses = async () => {
    const res = await fetch(`${API}/get_courses.php`);
    const data = await res.json();
    setCourses(data);
    setLoading(false);
  };

  const fetchPurchasedCourses = async (userId: number) => {
    const res = await fetch(`${API}/get_purchased_courses.php?user_id=${userId}`);
    const data = await res.json();
    setPurchasedCourses(data.map((item: any) => item.course_id));
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Courses</h1>
      {courses.map((c) => (
        <div key={c.id}>
          <h3>{c.title}</h3>
          {purchasedCourses.includes(c.id) ? (
            <Button onClick={() => window.open(c.pdf_link, "_blank")}>Download Course</Button>
          ) : (
            <Button onClick={() => handleBuyCourse(c)}>Buy ({c.points_required} pts)</Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Courses;