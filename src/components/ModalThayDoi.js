import React, { useContext, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);



function TraTien({ open, closeModal }) {
    
    return (
        <>
            <Dialog onClose={closeModal} aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle id="customized-dialog-title" onClose={closeModal}>
                    Thay đổi số tiền
                </DialogTitle>
                <DialogContent dividers>
                    <div className='col-md-12 row'>
                        <span>Số tiền:&nbsp;</span>
                            <input type='number' className='form-control col-md-6' /> &nbsp;
                        {/* <input type="radio" className="form-check-input" name="optradio" value='T'/>Option 1
                        <input type="radio" className="form-check-input" name="optradio" value='G'/>Option 2 */}
                        <div class="form-check-inline">
                            <label class="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio" value='T'/>Tăng
                        </label>
                        </div>
                        <div class="form-check-inline">
                            <label class="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio" value='G'/>Giảm
                        </label>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeModal} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default TraTien;