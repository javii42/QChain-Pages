import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import {
    Media
} from 'reactstrap';
import {SessionActions} from '@actions';
import {get, isEmpty} from 'lodash';
import fromState from '@selectors';
import Logo from '../../images/logo.png';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#7d2a84',
        '&:hover': {
            background: '#7d2a84'
        }
    },
    inputRoot: {
        '&$disabled': {
            color: 'black'
        }
    },
    disabled: {}
}));

const RegisterEmployeeAsAdmin = ({
    deleteEmployeeAsAdminRequested,
    getEmployeeAsAdminRequested,
    user
}) => {
    const classes = useStyles();

    const [data, setData] = React.useState(
        {
            _id: '',
            user_doc_type: '',
            user_doc_number: ''
        }
    );
    const [dataToModify, setDataToModify] = React.useState(
        {
            _id: get(user, '_id', ''),
            user_name: get(user, 'user_name', ''),
            user_mail: get(user, 'user_mail', '')
        }
    );

    useEffect(() => {
        if (!isEmpty(get(user, '_id')) && !isEmpty(get(user, 'user_name')) && !isEmpty(get(user, 'user_mail'))) {
            setDataToModify({
                _id: get(user, '_id', ''),
                user_name: get(user, 'user_name', ''),
                user_mail: get(user, 'user_mail', '')
            });
        }
    }, [user]);

    const handleChangeModified = event => {
        setDataToModify({...dataToModify, [event.target.name]: event.target.value});
    };

    const handleChange = event => {
        setData({...data, [event.target.name]: event.target.value});
    };

    const handleRegister = e => {
        e.preventDefault();
        deleteEmployeeAsAdminRequested({...data});
    };

    const handleSearch = e => {
        e.preventDefault();
        getEmployeeAsAdminRequested({...data});
    };

    return (
        <Container >
            <CssBaseline/>
            <div
                className={classes.paper}
            >
                <Media
                    style={{
                        height: '25px',
                        width: '25px'
                    }}
                    className="mt-5 mb-3"
                />
                <Media
                    src={Logo}
                    style={{
                        height: '60px',
                        width: '60px'
                    }}
                    className="mt-3 mb-3"
                />
                <Typography component="h1" variant="h5">
                    Eliminar - empleado
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                name="_id"
                                label="ID"
                                type="text"
                                id="_id"
                                autoComplete="current-password"
                                onChange={e => handleChange(e)}
                            />
                            <InputLabel/>
                            <InputLabel id="demo-simple-select-helper-label">
                                Tipo de documento
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="user_doc_type"
                                value={get(data, 'user_doc_type')}
                                onChange={e => handleChange(e)}
                            >
                                <MenuItem value="1">LIBRETA CÍVICA</MenuItem>
                                <MenuItem value="2">LIBRETA DE ENROLAMIENTO</MenuItem>
                                <MenuItem value="3">DNI</MenuItem>
                            </Select>
                            <TextField
                                variant="outlined"
                                required
                                name="user_doc_number"
                                label="Nº de CUIL"
                                type="text"
                                id="repeatPassword"
                                autoComplete="current-password"
                                onChange={e => handleChange(e)}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => handleSearch(e)}
                        >
                            Buscar
                        </Button>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                disabled
                                autoComplete="fname"
                                name="user_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="user_name"
                                label="Nombre de la compañía"
                                value={get(dataToModify, 'user_name')}
                                autoFocus
                                onChange={e => handleChangeModified(e)}
                                InputProps={{
                                    classes: {
                                        root: classes.inputRoot,
                                        disabled: classes.disabled
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                disabled
                                autoComplete="fname"
                                name="user_mail"
                                variant="outlined"
                                required
                                fullWidth
                                id="user_mail"
                                label="E-mail de la compañía"
                                value={get(dataToModify, 'user_mail')}
                                autoFocus
                                onChange={e => handleChangeModified(e)}
                                InputProps={{
                                    classes: {
                                        root: classes.inputRoot,
                                        disabled: classes.disabled
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => handleRegister(e)}
                    >
                        Eliminar
                    </Button>
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = state => ({
    user: fromState.Session.getEmployee()(state)
});

const {
    deleteEmployeeAsAdminRequested,
    getEmployeeAsAdminRequested
} = SessionActions;

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({
        deleteEmployeeAsAdminRequested,
        getEmployeeAsAdminRequested
    }, dispatch)
)(RegisterEmployeeAsAdmin);
