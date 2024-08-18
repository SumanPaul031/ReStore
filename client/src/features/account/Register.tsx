import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default function Register() {
	// const [validationErrors, setValidationErrors] = useState([]);
	const navigate = useNavigate();
	// const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors, isValid },
	} = useForm({
		mode: "all",
	});

	function handleApiErrors(errors: any) {
		if (errors) {
			errors.forEach((err: string) => {
				if (err.includes("Password")) {
					setError("password", { message: err });
				} else if (err.includes("Email")) {
					setError("email", { message: err });
				} else if (err.includes("Username")) {
					setError("username", { message: err });
				}
			});
		}
	}

	// async function submitForm(data: FieldValues) {
	// 	await dispatch(signInUserAsync(data));
	// 	navigate("/catalog");
	// }

	return (
		<Container
			component={Paper}
			maxWidth="sm"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				p: 4,
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Register
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit((data) =>
					agent.Account.register(data)
						.then(() => {
							toast.success("Registration Successful");
							navigate("/login");
						})
						.catch((err) => handleApiErrors(err))
				)}
				noValidate
				sx={{ mt: 1 }}
			>
				<TextField
					margin="normal"
					fullWidth
					label="Username"
					autoFocus
					{...register("username", {
						required: "Username is required",
					})}
					error={!!errors.username}
					helperText={errors?.username?.message as string}
				/>
				<TextField
					margin="normal"
					fullWidth
					label="Email"
					{...register("email", {
						required: "email is required",
						pattern: {
							value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
							message: "Not a valid email",
						},
					})}
					error={!!errors.email}
					helperText={errors?.email?.message as string}
				/>
				<TextField
					margin="normal"
					fullWidth
					label="Password"
					type="password"
					{...register("password", {
						required: "Password is required",
						pattern: {
							value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
							message: "Not a valid password pattern",
						},
					})}
					error={!!errors.password}
					helperText={errors?.password?.message as string}
				/>
				{/* {validationErrors.length > 0 && (
					<Alert severity="error">
						<AlertTitle>Validation Errors</AlertTitle>
						<List>
							{validationErrors.map((error) => (
								<ListItem key={error}>
									<ListItemText>{error}</ListItemText>
								</ListItem>
							))}
						</List>
					</Alert>
				)} */}
				{/* <FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/> */}
				<LoadingButton
					disabled={!isValid}
					loading={isSubmitting}
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Register
				</LoadingButton>
				<Grid container>
					{/* <Grid item xs>
						<Link href="#" variant="body2">
							Forgot password?
						</Link>
					</Grid> */}
					<Grid item>
						<Link to="/login">
							{"Already have an account? Sign In"}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
