import React, { useState, useRef, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { uploadFile } from 'react-s3';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Alert } from '@mui/material';

window.Buffer = window.Buffer || require("buffer").Buffer;


const Input = styled('input')({
    display: 'none',
});

const S3_BUCKET = 'pricetrackadya';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIA53AZMDJWBMA7U36J';
const SECRET_ACCESS_KEY = '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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

export default function Dropper() {
    const [file, setFile] = useState(null)
    const [store, setStore] = useState("McDonald's")
    const [column, setColumn] = useState("")
    const [error, setError] = useState(false)
    const [uploading, setUploading] = useState(false)
    const inputRef = useRef()
    const handleFileInput = () => {
        setFile(inputRef.current.files[0])
    }
    const handleStoreChange = (event) => {
        setStore(event.target.value);
    }
    const handleColChange = (event) => {
        setColumn(event.target.value)
    }

    const handleSubmit = (event) => {
        setError(false)
        if (!file || !store || !column) {
            setError(true)
        } else {
            setUploading(true)
            uploadFile(file, config)
                .then(data => {
                    console.log(data)
                    setUploading(false)
                })
                .catch(err => console.error(err))
        }
    }
    useEffect(() => {
        console.log(file)
    }, [file])


    // const handleUpload = async (file) => {
    //     uploadFile(file, config)
    //         .then(data => console.log(data))
    //         .catch(err => console.error(err))
    // }

    return (
        <Paper style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <FormControl>
                <Stack direction="column" alignItems="center" spacing={2}>
                    <Typography >Press the button below to upload an Excel <strong>(.xlsx)</strong> file.</Typography>
                    <label htmlFor="contained-button-file">
                        <Input accept=".xlsx, .xls" id="contained-button-file" multiple type="file" ref={inputRef} onChange={handleFileInput} />
                        <Button variant="contained" component="span" disableElevation>
                            Upload
                        </Button>
                    </label>
                    <Typography>Select a store below.</Typography>
                    <Select
                        value={store}
                        label="Store"
                        onChange={handleStoreChange}
                    >
                        <MenuItem value={"McDonald's"}>McDonald's</MenuItem>
                    </Select>

                    <Typography>Enter a column name below.</Typography>
                    <TextField placeholder='Column name' onChange={handleColChange}></TextField>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    {error && <Alert severity="error">One or more inputs are missing.</Alert>}
                    {uploading && <Alert severity="info">Performing upload.</Alert>}
                </Stack >
            </FormControl >

        </Paper >



    )
}