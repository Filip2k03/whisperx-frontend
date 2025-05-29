import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PDFPreviewButton = ({ url }: { url: string }) => {
  const [open, setOpen] = useState(false);
  const previewUrl = `https://docs.google.com/gview?url=${url}&embedded=true`;

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        View PDF
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>
          Preview
          <IconButton
            onClick={() => setOpen(false)}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers style={{ height: "80vh" }}>
          <iframe
            src={previewUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="PDF Preview"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PDFPreviewButton;
