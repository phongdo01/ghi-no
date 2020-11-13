import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import firebase from '../config/firebase'
import mcontext from '../Context'

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


let onAiNo = async function (context, amount, index, type) {

    const user = context.user
    const ref = firebase.database().ref('account/' + user.username)
    const snap = await (await ref.once('value')).val()
    let aiNo = snap.aiNo || []
    let history = snap.history || []
    aiNo[index].amount += type == 'T' ? Number(amount) : Number(amount) * (-1)

    user.aiNo = aiNo
    let dat = new Date();
    let name = aiNo[index].name
    history.unshift({
        name: name, amount: Number(amount),
        date: dat.getHours() + ':' + dat.getMinutes() + ' ' + dat.getDate() + '-' + (dat.getMonth() + 1) + '-' + dat.getFullYear(),
        type: type == 'G' ? 'tnm' : 'out'
    })
    user.history = history
    ref.set(user)
    context.setUser({ ...user })
}
let onNoAi = async function (context, amount, index, type) {

    const user = context.user
    const ref = firebase.database().ref('account/' + user.username)
    const snap = await (await ref.once('value')).val()
    let noAi = snap.noAi || []
    let history = snap.history || []

    noAi[index].amount += type == 'T' ? Number(amount) : Number(amount) * (-1)

    user.noAi = noAi
    let dat = new Date();
    let name = noAi[index].name
    history.unshift({
        name: name, amount: Number(amount),
        date: dat.getHours() + ':' + dat.getMinutes() + ' ' + dat.getDate() + '-' + (dat.getMonth() + 1) + '-' + dat.getFullYear(),
        type: type == 'G' ? 'mtn' : 'in'
    })
    user.history = history
    ref.set(user)
    context.setUser({ ...user })
}
function TraTien({ open, closeModal, data }) {
    let context = useContext(mcontext)
    let [amount, setAmount] = useState('')
    let [type, setType] = useState('T')
    let changeAmount = (value) => {
        setAmount(value.value)
    }
    const close = () => {
        if (data.type == 'AiNo') {
            onAiNo(context, amount, data.index, type)
        } else {
            onNoAi(context, amount, data.index, type)
        }
        closeModal()
        reset()
    }
    const changeChecked = (e) => {
        setType(e.target.value)
    }
    const reset = ()=>{
        setType('T')
        setAmount('')
    }
    return (
        <>
            <Dialog onClose={closeModal} aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth={'sm'}>
                <DialogTitle id="customized-dialog-title" onClose={closeModal}>
                    Thay đổi số tiền
                </DialogTitle>
                <DialogContent dividers>
                    <div className='col-md-12 row'>
                        <span>Số tiền:&nbsp;</span>
                        {/* <input type='number' className='form-control col-md-6' /> &nbsp; */}
                        <NumberFormat
                            value={amount}
                            displayType={'input'}
                            thousandSeparator={true}
                            // style={{ float: 'right' }}
                            className='form-control col-md-6'
                            onValueChange={changeAmount}
                            suffix={'$'}
                        />
                        &nbsp;
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input checked={type == 'T'} type="radio" className="form-check-input" name="optradio" value='T' onClick={changeChecked} readOnly />Tăng
                        </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input checked={type == 'G'} type="radio" className="form-check-input" name="optradio" value='G' onClick={changeChecked} readOnly />Giảm
                        </label>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={close} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default TraTien;