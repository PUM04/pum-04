/**
 *
 * @file DragAndDropzone component used for uploading files.
 */
import React, { Dispatch } from 'react';
import { Box } from '@mui/material';
import Dropzone from 'react-dropzone';

/**
 * @property setter - useState setter for the files
 * @property value - current value of the files
 */
export interface DropzoneProps {
  setter: Dispatch<React.SetStateAction<File[]>>;
  value: File[];
}

/**
 * DragAndDropzone component used for uploading files.
 *
 * @param props DropzoneProps - state setter and current value
 * @returns Dropzone component
 */
export default function DragAndDropzone(props: DropzoneProps) {
  const { setter, value: files } = props;
  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        const allFiles = files.concat(acceptedFiles);
        setter(allFiles);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Box
              component="span"
              sx={{ p: 2, border: '2px dashed grey', borderRadius: '10px' }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <p>Upload files</p>
            </Box>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
