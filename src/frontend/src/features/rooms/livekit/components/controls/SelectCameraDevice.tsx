import { SelectToggleDevice } from './SelectToggleDevice'
import { Track } from 'livekit-client'

export const SelectCameraDevice = (props) => (
  <SelectToggleDevice source={Track.Source.Camera} {...props} />
) 