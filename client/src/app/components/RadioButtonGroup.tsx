import {
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";

interface Props {
	options: any[];
	onChange: (event: any) => void;
	selectedValue: string;
}

export default function RadioButtionGroup({
	options,
	onChange,
	selectedValue,
}: Props) {
	return (
		<FormControl component="fieldset">
			<RadioGroup onChange={onChange} value={selectedValue}>
				{options.map(({ value, label }) => (
					<FormControlLabel
						key={value} // Add a key prop for better performance and to avoid warnings
						value={value}
						control={<Radio />}
						label={label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}
