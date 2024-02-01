import React, { Fragment, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from 'src/@core/components/icon';
import { useDropzone } from 'react-dropzone';
import Grid from '@mui/material/Grid';

const FileUploaderMultiple = ({ onUpdate }) => {
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const newFiles = acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            );
            setFiles(newFiles);
            onUpdate(newFiles);
        }
    });

    const handleRemoveFile = file => {
        const filteredFiles = files.filter(f => f.name !== file.name);
        setFiles(filteredFiles);
        onUpdate(filteredFiles);
    };

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <Fragment>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box sx={{ mb: 8.75, width: 48, height: 48, display: 'flex', borderRadius: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)` }}>
                        <Icon icon='tabler:upload' fontSize='1.75rem' />
                    </Box>
                    <Typography variant='h4' sx={{ mb: 2.5 }}>
                        Drop files here or click to upload.
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        (This is just a demo drop zone. Selected files are not actually uploaded.)
                    </Typography>
                </Box>
            </div>
            {files.length > 0 && (
                <Fragment>
                    <Grid container spacing={2} justifyContent="flex-start">
                        {files.map(file => (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={file.name}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={file.preview} alt={file.name} style={{ width: '100%', height: 'auto', maxWidth: '200px' }} />
                                    <Typography gutterBottom variant="caption">{file.name}</Typography>
                                    <IconButton size="small" onClick={() => handleRemoveFile(file)}>
                                        <Icon icon='tabler:x' />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Fragment>
            )}
        </Fragment>
    );
};

export default FileUploaderMultiple;
