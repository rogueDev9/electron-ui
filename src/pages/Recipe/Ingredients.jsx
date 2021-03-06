import React, { useState } from 'react'
import {
  Button,
  Grid,
  Box,
  makeStyles,
  Typography,
  Slider,
  useTheme,
  Dialog,
  DialogTitle
} from '@material-ui/core'

const styles = makeStyles(theme => ({
  ingredientsContainer: {
    marginTop: theme.spacing(2)
  },
  ingredientsImg: {
    width: '50%',
    height: '50%',
    marginLeft: '50%',
    transform: 'translateX(-50%)'
  }
}))

function ReplaceView (props) {
  return (
    <Dialog open={props.open}>
      <DialogTitle>Replace with what?</DialogTitle>
      <Grid
        container
        direction='row'
        justify='space-evenly'
        alignItems='center'
      >
        <Grid item>
          <img
            src='/assets/ingredients/paneer.png'
            alt='Onion'
            style={{ width: 50, marginTop: '8px', marginBottom: '8px' }}
          />
        </Grid>
        <Grid item>
          <img
            src='/assets/ingredients/paneer.png'
            alt='Onion'
            style={{ width: 50, marginTop: '8px', marginBottom: '8px' }}
          />
        </Grid>
        <Grid item>
          <img
            src='/assets/ingredients/paneer.png'
            alt='Onion'
            style={{ width: 50, marginTop: '8px', marginBottom: '8px' }}
          />
        </Grid>
      </Grid>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => props.onClose()}
      >
        Close
      </Button>
    </Dialog>
  )
}
function RemoveView (props) {
  return (
    <Dialog open={props.open}>
      <DialogTitle>Are you sure?</DialogTitle>
      <Button
        variant='outlined'
        color='secondary'
        onClick={() => props.onClose()}
      >
        Remove
      </Button>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => props.onClose()}
      >
        Cancel
      </Button>
    </Dialog>
  )
}

export default function (props) {
  // const recipe = props.recipe
  const [editView, toggleEdit] = useState(false, state => !state)
  const [open, setOpen] = useState(false, state => !state)
  const [removeOpen, setRemoveOpen] = useState(false, state => !state)
  const classes = styles(useTheme())

  return (
    <Box p={2}>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h4'>Ingredients Required</Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => toggleEdit(!editView)}
            variant='contained'
            color='secondary'
          >
            {editView ? 'Done' : 'Edit'}
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='flex-start'
        spacing={2}
        className={classes.ingredientsContainer}
      >
        {/* TODO: Required ingredients need to be loaded from recipe data */}
        {[
          'Chicken',
          'Onion',
          'Garlic',
          'Chicken',
          'Garlic',
          'Onion',
          'Garlic',
          'Chicken'
        ].map((ingredient, i) => (
          <Grid item key={i}>
            <Box width={180} p={2} border='1px dashed'>
              <img
                src='/assets/ingredients/paneer.png'
                alt='paneer'
                className={classes.ingredientsImg}
              />
              <Typography align='center'>{ingredient}</Typography>
              {editView ? (
                <Box>
                  <Button
                    variant='contained'
                    color='secondary'
                    style={{ width: '100%', marginTop: '8px' }}
                    onClick={setOpen}
                  >
                    Replace
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    style={{ width: '100%', marginTop: '8px' }}
                    onClick={setRemoveOpen}
                  >
                    Remove
                  </Button>
                </Box>
              ) : (
                <Slider
                  style={{ color: '#313131' }}
                  defaultValue={5}
                  step={1}
                  marks={[
                    { value: 1, label: 'S' },
                    { value: 10, label: 'L' }
                  ]}
                  min={1}
                  max={10}
                />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
      {editView || (
        <Box textAlign='center' width='100%' p={3}>
          <Button
            onClick={props.handleStep}
            variant='contained'
            color='secondary'
          >
            Next
          </Button>
        </Box>
      )}
      <ReplaceView onClose={setOpen} open={open} />
      <RemoveView onClose={setRemoveOpen} open={removeOpen} />
    </Box>
  )
}
