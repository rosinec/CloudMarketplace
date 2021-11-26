import { Box, Chip, Button, Toolbar, Drawer } from '@mui/material';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { Dispatch, SetStateAction } from 'react';

import { useTags } from '../hooks/useApps';

const drawerWidth = 200;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 200
		}
	}
};

type Props = {
	tags: string[];
	setTags: Dispatch<SetStateAction<string[]>>;
};

const AppFilterDrawer = ({ tags, setTags }: Props) => {
	const allTags = useTags();

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value }
		} = event;
		setTags(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleClear = () => {
		setTags([]);
	};

	return (
		<Box flexGrow={0} width="200px">
			<Drawer
				sx={{
					'width': drawerWidth,
					'flexShrink': 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />
				<Button style={{ justifyContent: 'flex-start' }}>All</Button>
				<Divider />
				<Button style={{ justifyContent: 'flex-start' }}>Trending</Button>
				<Divider />
				<Button style={{ justifyContent: 'flex-start' }}>New</Button>
				<Divider />
				<FormControl sx={{ mt: '30px', width: 180 }}>
					<Button
						sx={{
							width: '20px',
							position: 'absolute',
							pr: '0px',
							right: '0',
							mt: '-15px',
							fontSize: '10px'
						}}
						onClick={handleClear}
					>
						Clear
					</Button>
					<InputLabel id="category-checkbox-label">CATEGORY</InputLabel>

					<Select
						labelId="category-checkbox-label"
						id="category-checkbox"
						multiple
						disableUnderline
						value={tags}
						onChange={handleChange}
						input={<Input sx={{ p: '10px' }} />}
						renderValue={selected => (
							<Box
								sx={{
									paddingRight: '10px',
									paddingBottom: '0px',
									display: 'flex',
									flexWrap: 'wrap',
									gap: 0.5
								}}
							>
								{selected.map(value => (
									<Chip key={value} label={value} />
								))}
							</Box>
						)}
						MenuProps={MenuProps}
					>
						{Array.from(allTags.values()).map(name => (
							<MenuItem key={name} value={name}>
								<Checkbox checked={tags.indexOf(name) > -1} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Drawer>
		</Box>
	);
};

export default AppFilterDrawer;