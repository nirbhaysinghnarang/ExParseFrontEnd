import React, { useState, useRef, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import { Button, Link, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Alert } from '@mui/material';
import Papa from 'papaparse';
import { LoadingButton } from '@mui/lab';
import InfoIcon from '@mui/icons-material/Info';
import { getPrices } from '../serverClient';
const Input = styled('input')({
    display: 'none',
});



export default function Dropper() {

    const [file, setFile] = useState(null)
    const [store, setStore] = useState("McDonald's")
    const [inColumn, setInColumn] = useState("")
    const [outColumn, setOutColumn] = useState("")
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [uploading, setUploading] = useState(false)
    const [names, setNames] = useState([])
    const [uri, setUri] = useState("")
    const [download, setDownload] = useState(false)
    const inputRef = useRef()
    const handleFileInput = () => {
        setFile(inputRef.current.files[0])
    }
    const handleStoreChange = (event) => {
        setStore(event.target.value);
    }
    const handleInColChange = (event) => {
        setInColumn(event.target.value)
    }

    const handleOutColChange = (event) => {
        setOutColumn(event.target.value)
    }

    const parseCSV = async () => {
        const response = await new Promise((resolve, reject) =>
            Papa.parse(file, {
                header: true,
                complete: resolve,
                error: reject,
            }),
        )

        console.log(response)

        let names = []
        response.data.forEach(elem => {
            names.push(elem[inColumn])
        })
        setNames(names)
        const infoObj = getPrices(names, inColumn, outColumn)
        const infoArray = infoObj.map(elem => [elem[inColumn], elem[outColumn]])
        infoArray.unshift([inColumn, outColumn])
        console.log(infoArray)
        let csvContent = "data:text/csv;charset=utf-8," + infoArray.map(e => e.join(",")).join("\n");
        let encodedUri = encodeURI(csvContent);
        setUri(encodedUri)
        setDownload(true)
        setUploading(false)
    }

    const handleSubmit = (event) => {
        setError(false)
        setNames([])
        if (!file || !store || !inColumn || !outColumn) {
            setError(true)
            setErrorMsg("One or more inputs are missing.")
        } else {
            setUploading(true)
            parseCSV(file)
        }
    }
    useEffect(() => {
        if (names.includes(undefined)) {
            setUploading(false)
            setError(true)
            setErrorMsg("That looks like an invalid column name.")
        }
    }, [names])

    return (
        <Paper style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}
            elevation={3}>
            <FormControl>
                <Stack justifyContent={"center"} direction="column" spacing={2}>
                    <Stack direction="row">
                        <Typography >Press the button below to upload an csv <strong>(.csv) </strong> file &nbsp;</Typography>
                        <Tooltip title="You can convert Excel files to csv using the Save as method in the Excel toolbar.">
                            <InfoIcon />
                        </Tooltip>
                    </Stack>

                    <label htmlFor="contained-button-file">
                        <Input accept=".csv" id="contained-button-file" multiple type="file" ref={inputRef} onChange={handleFileInput} />
                        <Button variant="contained" component="span" disableElevation
                            style={{ width: "100%" }}>
                            Upload 📂
                        </Button>
                    </label>
                    <Typography>Select a store below 👇🏻.</Typography>
                    <Select
                        value={store}
                        label="Store"
                        onChange={handleStoreChange}
                    >
                        <MenuItem value={"McDonald's"}>McDonald's</MenuItem>
                    </Select>

                    <Typography>Enter the input name below 👇🏻.</Typography>
                    <Tooltip title="Enter the name of the column which contains the names of the items you want data for.">
                        <TextField placeholder='Column name' onChange={handleInColChange}></TextField>
                    </Tooltip>

                    <Typography>Enter the output name below 👇🏻.</Typography>
                    <Tooltip title="Enter the name of the column where you want us to put the prices"
                    >
                        <TextField placeholder='Column name' onChange={handleOutColChange}></TextField>
                    </Tooltip>

                    <LoadingButton
                        variant="contained"
                        onClick={handleSubmit}
                        disableElevation
                        loading={uploading}
                    >
                        Submit ✅
                    </LoadingButton>
                    {error && <Alert severity="error">{errorMsg}</Alert>}
                    {uploading && <Alert severity="info">Processing...</Alert>}
                    {download && <Link href={uri}>
                        <Typography variant='subtitle2'>
                            Your download is ready! 👑
                        </Typography>

                    </Link>}
                </Stack >
            </FormControl >

        </Paper >



    )
}