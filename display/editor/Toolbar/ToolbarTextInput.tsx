import { TextField, makeStyles, InputAdornment } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import _var from '../../styles/common/_var.module.scss';

const useStyles = makeStyles({
  root: {
    padding: 0,
    width: '100%',
    // background:"#efeff1",
    borderRadius: '100px',
    border: 'none',
    margin: 0,
    // marginTop: 7,
    position: 'relative',
  },
  input: {
    background: _var.primaryLightColor,
    color: '#ffffff',
    borderRadius: '100px',
    fontSize: '12px',
    paddingLeft: '16px',
    paddingRight: '8px',
    paddingBottom: '8px',
    paddingTop: '8px',
    margin: 0,
  }, // a style rule
  // notchedOutline: {
  //   borderColor:'transparent',
  //   borderRadius: "100px"
  // }
});

const useLabelStyles = makeStyles({
  root: {
    color: _var.secondaryColor,
  },
  formControl: {
    fontSize: '18px',
    borderRadius: '100px',
    paddingLeft: '0px',
    paddingTop: '3px',
    marginBottom: '3px',
    position: 'relative',
    left: '-12px',
  }, // a style rule
});

export type ToolbarTextInputProps = {
  prefix?: string;
  label?: string;
  type: string;
  width: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  value?: any;
};
export const ToolbarTextInput = ({
  onChange,
  value,
  prefix,
  type,
  disabled = false,
  label,
  width,
  ...props
}: ToolbarTextInputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);
  const classes = useStyles({});
  const labelClasses = useLabelStyles({});
  useEffect(() => {
    let val = value;
    console.log('aaaaaaaa', type, val);
    if (type === 'color' || type === 'bg') val = `    rgba(${Object.values(value)})`;
    setInternalValue(val);
  }, [value, type]);

  return (
    <div
      style={{ width: width ? width : '100%', position: 'relative' }}
      onClick={() => {
        if (disabled) return;
        setActive(true);
      }}
    >
      {(type === 'color' || type === 'bg') && active ? (
        <div
          className='absolute'
          style={{
            zIndex: 99999,
            top: 'calc(100% + 10px)',
            left: '-5%',
          }}
        >
          <div
            className='fixed top-0 left-0 w-full h-full cursor-pointer'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(false);
            }}
          ></div>
          <ChromePicker
            color={value}
            onChange={(color: any) => {
              onChange(color.rgb);
            }}
          />
        </div>
      ) : null}
      <TextField
        style={{ margin: 0 }}
        value={internalValue || ''}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange((e.target as any).value);
          }
        }}
        onChange={(e) => {
          setInternalValue(e.target.value);
        }}
        margin='dense'
        variant='filled'
        InputProps={{
          classes,
          disableUnderline: true,
          startAdornment: ['color', 'bg'].includes(type) ? (
            <InputAdornment
              position='start'
              style={{
                position: 'absolute',
                marginTop: '2px',
                marginRight: '8px',
              }}
            >
              <div
                className='w-2 h-2 inline-block rounded-full relative'
                style={{
                  left: '15px',
                  background: internalValue,
                }}
              />
            </InputAdornment>
          ) : null,
        }}
        InputLabelProps={{
          classes: {
            ...labelClasses,
          },
          shrink: true,
        }}
        {...props}
      />
    </div>
  );
};
