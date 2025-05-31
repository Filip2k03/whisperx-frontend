import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

interface Prompt {
  id: number;
  title: string;
  points_required: number;
  pdf_link: string;
}

const Prompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [user, setUser] = useState<any>({});
  const [purchasedPrompts, setPurchasedPrompts] = useState<number[]>([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(u);
    fetchPrompts();
    fetchPurchasedPrompts(u.id);
  }, []);

  const fetchPrompts = async () => {
    const res = await fetch(`${API}/get_prompts.php`);
    const data = await res.json();
    setPrompts(data);
  };

  const fetchPurchasedPrompts = async (userId: number) => {
    const res = await fetch(`${API}/get_purchased_prompts.php?user_id=${userId}`);
    const data = await res.json();
    setPurchasedPrompts(data.map((item: any) => item.prompt_id));
  };

  const handleBuyPrompt = async (prompt: Prompt) => {
    if (user.points < prompt.points_required) return toast.error("Not enough points.");

    const res = await fetch(`${API}/buy_prompt.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt_id: prompt.id, user_id: user.id }),
    });
    const data = await res.json();

    if (data.success) {
      toast.success("Prompt unlocked!");
      setPurchasedPrompts([...purchasedPrompts, prompt.id]);
      const updatedUser = { ...user, points: data.new_points };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } else toast.error(data.error);
  };

  return (
    <div>
      <h1>Prompts</h1>
      {prompts.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          {purchasedPrompts.includes(p.id) ? (
            <Button
              onClick={() => {
                window.open(`${API}/${p.pdf_link}`, "_blank");
                window.open(
                  "https://admin.z267312-o74cz.ls01.zwhhosting.com/uploads/prompts/prompt_6839d13f12571.pdf",
                  "_blank"
                );
              }}
            >
              View Prompt
            </Button>
          ) : (
            <Button onClick={() => handleBuyPrompt(p)}>Buy ({p.points_required} pts)</Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Prompts;