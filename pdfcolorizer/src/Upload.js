import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

const Uploader = ({ filename, onChange, onClick }) => {
    
    const classes = useStyles();
    return (
        <div>
            <input
                accept=".pdf"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={onChange}
            />
    
            <label htmlFor="contained-button-file">
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    component='span'
                    onClick={onClick}
                    type="submit"
                     >
                    Upload
                </Button>
            </label>
        </div>
    )
};

export default Uploader;
