"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useState } from "react";
import NavbarHorizontal from "../../../components/NavbarHorizontal";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Prevent non-numeric input for cardNumber and cvv
    if (["cardNumber", "cvv"].includes(id) && /\D/.test(value)) {
      return;
    }

    // Allow numeric input and the '/' character for expiryDate
    if (id === "expiryDate" && /[^0-9/]/.test(value)) {
      return;
    }

    // Prevent numbers in name, allow everything else
    if (id === "name" && /\d/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Check if all fields are filled
    if (!formData.name) newErrors.name = "Name on card is required";
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";

    // Validate card number (exactly 16 digits)
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be exactly 16 digits";
    }

    // Validate CVV (exactly 3 digits)
    if (formData.cvv && !/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits";
    }

    // Validate expiry date (MM/YY format and must be a future date)
    const [month, year] = formData.expiryDate.split("/").map(Number);
    if (
      formData.expiryDate &&
      (!/^\d{2}\/\d{2}$/.test(formData.expiryDate) ||
        month < 1 ||
        month > 12 ||
        year < new Date().getFullYear() % 100)
    ) {
      newErrors.expiryDate =
        "Invalid expiry date. Use MM/YY and must be a future date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Proceed with form submission
      console.log("Form data:", formData);
    }
  };

  return (
    <>
      <Box>
        <NavbarHorizontal />
      </Box>
      <Box
        mt={1}
        ml={1}
        mr={1}
        sx={{
          maxWidth: "750px",
          mx: "auto",
          p: 2.5,
          backgroundColor: "#181932",
          borderRadius: "5px",
          boxShadow: "0 0 2px 0 #A4AECA, 0 0 5px 2px rgba(164, 174, 202, 0.01)",
          border: "1px solid #1C6090",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1C1E4A",
            p: 2,
            borderRadius: "5px",
            mb: 4,
          }}
        >
          <Typography variant="body2" color="white">
            You are one step away from story perfection!
          </Typography>
        </Box>

        {/* Credit Card Details Form */}
        <Box>
          <Typography variant="h6" color="white" gutterBottom>
            Credit Card Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                placeholder="Name on Card"
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                InputLabelProps={{
                  style: { color: "#A4AECA" },
                }}
                sx={{
                  backgroundColor: "#2C2F48",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#A4AECA",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1C6090",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white", // Input text color
                    padding: "11px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cardNumber"
                placeholder="Card Number"
                variant="outlined"
                value={formData.cardNumber}
                onChange={handleInputChange}
                error={Boolean(errors.cardNumber)}
                helperText={errors.cardNumber}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 16,
                }}
                InputLabelProps={{
                  style: { color: "#A4AECA" },
                }}
                sx={{
                  backgroundColor: "#2C2F48",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#A4AECA",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1C6090",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white", // Input text color
                    padding: "11px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                variant="outlined"
                value={formData.expiryDate}
                onChange={handleInputChange}
                error={Boolean(errors.expiryDate)}
                helperText={errors.expiryDate}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 5,
                }}
                InputLabelProps={{
                  style: { color: "#A4AECA" },
                }}
                sx={{
                  backgroundColor: "#2C2F48",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#A4AECA",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1C6090",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white", // Input text color
                    padding: "11px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="cvv"
                placeholder="CVV"
                variant="outlined"
                value={formData.cvv}
                onChange={handleInputChange}
                error={Boolean(errors.cvv)}
                helperText={errors.cvv}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 3,
                }}
                InputLabelProps={{
                  style: { color: "#A4AECA" },
                }}
                sx={{
                  backgroundColor: "#2C2F48",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#A4AECA",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1C6090",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white", // Input text color
                    padding: "11px",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, borderColor: "#A4AECA" }} />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#116C93",
              color: "white",
              "&:hover": {
                backgroundColor: "#105D7E",
              },
            }}
            fullWidth
            onClick={handleSubmit}
          >
            Submit Payment
          </Button>
        </Box>
      </Box>
    </>
  );
}
