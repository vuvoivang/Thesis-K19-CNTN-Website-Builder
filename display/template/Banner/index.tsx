import { Button, Container, Text, Video, Input, Image, Anchor } from 'display/raw-components';
import {
  CraftButton,
  CraftContainer,
  CraftText,
  CraftVideo,
  CraftInput,
  CraftImage,
  CraftAnchor,
} from 'display/selectors';

export const BannerTemplateConfig = [
  {
    raw: {
      type: Container,
      overwriteProps: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: ['4', '4', '4', '4'],
        className: 'cursor-move',
      },
      children: [
        {
          type: Text,
          overwriteProps: {
            fontSize: '12',
            tagName: 'h1',
            text: 'Design website professionally',
            textAlign: 'center',
            fontWeight: '500',
            color: { r: '0', g: '0', b: '0', a: '1' },
            margin: ['0', '0', '4', '0'],
          },
        },
        {
          type: Image,
          overwriteProps: {
            height: '120px',
            width: '100%',
            src: 'https://images.unsplash.com/photo-1686740172488-6a680069affb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            radius: 2,
          },
        },
        {
          type: Button,
          overwriteProps: {
            color: { r: '255', g: '255', b: '255', a: '1' },
            background: { r: '9', g: '35', b: '163', a: '1' },
            fontSize: '8',
            fontWeight: '400',
            text: 'Start Immediately',
            width: 'fit-content',
            padding: ['2', '2', '2', '2'],
            margin: ['5', '2', '5', '0'],
          },
        },
      ],
    },
    craft: {
      type: CraftContainer,
      overwriteProps: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      children: [
        {
          type: CraftText,
          overwriteProps: {
            fontSize: '22',
            tagName: 'h1',
            text: 'Design website professionally',
            textAlign: 'center',
            fontWeight: '500',
            color: { r: '0', g: '0', b: '0', a: '1' },
            margin: ['0', '0', '16', '0'],
          },
        },
        {
          type: CraftImage,
          overwriteProps: {
            height: '300px',
            width: '100%',
            src: 'https://images.unsplash.com/photo-1686740172488-6a680069affb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            radius: 2,
          },
        },
        {
          type: CraftButton,
          overwriteProps: {
            color: { r: '255', g: '255', b: '255', a: '1' },
            background: { r: '9', g: '35', b: '163', a: '1' },
            fontSize: '14',
            fontWeight: '400',
            text: 'Start Immediately',
            width: 'fit-content',
            padding: ['8', '8', '8', '8'],
            margin: ['5', '4', '5', '0'],
          },
        },
      ],
    },
  },
];
