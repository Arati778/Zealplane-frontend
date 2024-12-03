import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInstance from "../../../../../../Auth/Axios";

const ReportModal = ({ projectId, open, onClose }) => {
  const [reportReason, setReportReason] = useState("");

  const handleReportSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        `/projects/${projectId}/report`,
        { reason: reportReason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use your token storage method
          },
        }
      );

      toast.success(response.data.message || "Report submitted successfully");
      setReportReason(""); // Clear input field
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error reporting project:", error);
      toast.error("Failed to submit the report. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="report-dialog-title">
      <DialogTitle id="report-dialog-title">Report Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide a reason for reporting this project.
        </DialogContentText>
        <textarea
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          placeholder="Enter your reason here..."
          style={{
            width: "100%",
            height: "100px",
            marginTop: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            padding: "8px",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleReportSubmit} color="error">
          Submit Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportModal;
