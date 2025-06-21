import React from 'react'
import Sidebar from "../components/global/Sidebar";
import {Box, FormLabel, FormControl, TextField, Typography, Button} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import api from "../utils/api";

interface IFormInput {
  staffName: string,
  username: string,
  password: string,
}

function StaffSignupPage() {
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      staffName: "",
      username: "",
      password: "",
    }
  })
  const onSubmit = async(data: IFormInput) => {
    try {
      await api.post("/signup/staff", {
        username: data.username,
        password: data.password,
        staffName: data.staffName,
      })
      alert("Successfully created new staff member");
      reset();
    }
    catch (e) {
      alert(e);
    }
  }
  return (
      <>
        <Sidebar title={"Add staff"}/>
        <Box sx={{
          display: "flex",
          background: "beige",
          height: "100vh",
          justifyContent: "center",
          padding: "10px 20px"
        }}>
          <Box component="form"
               onSubmit={handleSubmit(onSubmit)}
               sx={{
            "& .MuiInputBase-input": {padding: 1, color: "black", minWidth: "100%"},
            "& .MuiFormControl-root": {minWidth: "100%"},
            "& .MuiFormLabel-root": {color: "black"},
            width: "600px",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            paddingBottom: "20px",
            paddingTop: "10px",
            alignItems: "center",
            background: "white",
            border: "2px solid gray",
            padding: "10px",
            height:"fit-content",
          }}>
            <Typography fontSize={"32px"}>Enter a new staff member</Typography>
            <Controller
                name="staffName"
                control={control}
                rules={{required: "This field is required"}}
                render={({field, fieldState}) =>
                    <FormControl>
                      <FormLabel>Name (required)</FormLabel>
                      <TextField {...field} autoComplete="off"
                                 helperText={fieldState.error?.message}
                                 error={!!fieldState.error}/>
                    </FormControl>
                }/>
            <Controller
                name="username"
                control={control}
                rules={{
                  required: "This field is required", pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email"
                  }
                }}
                render={({field, fieldState}) =>
                    <FormControl>
                      <FormLabel>Email (required)</FormLabel>
                      <TextField {...field} autoComplete="off"
                                 helperText={fieldState.error?.message}
                                 error={!!fieldState.error}/>
                    </FormControl>
                }/>
            <Controller
                name="password"
                control={control}
                rules={{required: "This field is required",}}
                render={({field, fieldState}) =>
                    <FormControl>
                      <FormLabel>Password (required)</FormLabel>
                      <TextField {...field} type="text" autoComplete="off" helperText={fieldState.error?.message}
                                 error={!!fieldState.error}/>
                    </FormControl>
                }
            />
            <Button variant="contained" sx={{marginTop:"4px"}} type="submit">Create staff</Button>
          </Box>

        </Box>

      </>
  )
}

export default StaffSignupPage
