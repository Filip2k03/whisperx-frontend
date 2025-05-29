import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import API from "../api/api";

const BuyToken = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const submitPayment = async () => {
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("name", name);
    formData.append("phone", phone);
    if (image) formData.append("payment_image", image);

    const res = await fetch(`${API}/buy_token.php`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Buy Token (Manual Upload)
      </Typography>
      <TextField label="Name" fullWidth sx={{ my: 2 }} onChange={(e) => setName(e.target.value)} />
      <TextField label="Phone" fullWidth sx={{ my: 2 }} onChange={(e) => setPhone(e.target.value)} />
      <Button variant="outlined" component="label" sx={{ my: 2 }}>
        Upload Screenshot
        <input type="file" hidden onChange={(e) => setImage(e.target.files?.[0] || null)} />
      </Button>
      {image && <Typography>{image.name}</Typography>}
      <Button variant="contained" onClick={submitPayment}>
        Submit
      </Button>
    </Box>
  );
};

export default BuyToken;
