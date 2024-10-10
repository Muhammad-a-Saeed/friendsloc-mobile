import React, {forwardRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS} from '../../utils/theme';

const BottomSheet = forwardRef(({children, onClose, height = 250, containerStyle}, ref) => {
  return (
    <RBSheet
      ref={ref}
      onClose={onClose}
      closeOnDragDown={true}
      closeOnPressMask={true}
      openDuration={200}
      closeDuration={200}
      height={height}
      customStyles={{
        wrapper: {},
        draggableIcon: {
          backgroundColor: COLORS.grey3,
          width: 70,
          height: 4,
        },
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 5,
          ...containerStyle,
        },
      }}>
      {children}
    </RBSheet>
  );
});

export default BottomSheet;
