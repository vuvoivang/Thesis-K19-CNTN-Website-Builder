import { useEditor } from 'libs/core/src';
import { Layers } from 'libs/layers/src';
import React, { useState } from 'react';
import styled from 'styled-components';

import { SidebarItem } from './SidebarItem';
import { Tabs, Tab, makeStyles } from '@material-ui/core';

import CustomizeIcon from '../../../../public/icons/customize.svg';
import LayerIcon from '../../../../public/icons/layers.svg';
import { Toolbar } from '../../Toolbar';
import _var from '../../../styles/common/_var.module.scss';
import useResize from 'hooks/useResize';

export const SidebarDiv = styled.div<{ enabled: boolean }>`
  // min-width: 320px;
  opacity: ${(props) => (props.enabled ? 1 : 0)};
  background: ${_var.whiteColor};
  margin-right: ${(props) => (props.enabled ? 0 : -300)}px;
`;
// const CarbonAdsContainer = styled.div`
//   width: 100%;
//   margin-top: auto;

//   #carbonads * {
//     margin: initial;
//     padding: initial;
//   }

//   #carbonads {
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
//       Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
//       sans-serif;

//     padding: 10px 0.5rem;
//     border-top: 1px solid rgb(229 231 235);
//   }

//   #carbonads {
//     display: flex;
//     width: 100%;
//     background-color: transparent;
//     z-index: 100;
//   }

//   #carbonads a {
//     color: inherit;
//     text-decoration: none;
//   }

//   #carbonads a:hover {
//     color: inherit;
//   }

//   #carbonads span {
//     position: relative;
//     display: block;
//     overflow: hidden;
//   }

//   #carbonads .carbon-wrap {
//     display: flex;
//   }

//   #carbonads .carbon-img {
//     display: block;
//     margin: 0;
//     line-height: 1;
//   }

//   #carbonads .carbon-img img {
//     display: block;
//   }

//   #carbonads .carbon-text {
//     font-size: 11px;
//     padding: 10px;
//     margin-bottom: 16px;
//     line-height: 1.5;
//     text-align: left;
//     color: #333333;
//     font-weight: 400;
//   }

//   #carbonads .carbon-poweredby {
//     display: block;
//     padding: 6px 8px;
//     text-align: center;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//     font-weight: 600;
//     font-size: 8px;
//     line-height: 1;
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     color: #8f8f8f;
//   }
// `;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyleTabs = makeStyles(() => ({
  root: {
    marginBottom: '16px',
  },
  scrollButtons: {
    // "& .MuiTouchRipple-root": {
    //   backgroundImage: "linear-gradient(90deg,hsl(0deg 5.14% 54.35% / 75%),hsla(0deg 5.14% 54.35% / 15%),hsla(0,0%,100%,.05));",
    // },
    '& svg': {
      fill: _var.primaryColor,
      fontSize: '1.75rem',
    },
  },
}));
const StyledTab = styled(Tab)`
  min-width: 120px !important;
  width: 120px !important;
`;
export const Sidebar = () => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const tabsStyle = useStyleTabs({});

  const { width: widthSidebar, enableResize, isResizing } = useResize({ minWidth: 220, initialWidth: 300, direction: "rtl" });

  return (
    <SidebarDiv enabled={enabled} className='sidebar transition w-2 relative' style={{width: widthSidebar}}>
      <div className='flex flex-col h-full'>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          aria-label='simple tabs example'
          scrollButtons='auto'
          variant='scrollable'
          classes={tabsStyle}
        >
          <StyledTab label='Customize' className='text-black-important text-base' {...a11yProps(0)} />
          <StyledTab label='Layers' className='text-black-important text-base' {...a11yProps(1)} />
          <StyledTab label='Events' className='text-black-important text-base' {...a11yProps(2)} />
        </Tabs>
        <SidebarItem
          role='tabpanel'
          id={`simple-tabpanel-${0}`}
          aria-labelledby={`simple-tab-${0}`}
          icon={CustomizeIcon}
          title='Customize'
          height='full'
          visible={currentTab === 0}
        >
          <Toolbar type='settings' />
        </SidebarItem>
        <SidebarItem
          role='tabpanel'
          id={`simple-tabpanel-${1}`}
          aria-labelledby={`simple-tab-${1}`}
          icon={LayerIcon}
          title='Layers'
          height='full'
          visible={currentTab === 1}
        >
          <div className=''>
            <Layers expandRootOnLoad={true} />
          </div>
        </SidebarItem>
        <SidebarItem
          role='tabpanel'
          id={`simple-tabpanel-${2}`}
          aria-labelledby={`simple-tab-${2}`}
          icon={CustomizeIcon}
          title='Customize'
          height='full'
          visible={currentTab === 2}
        >
          <Toolbar type='events' />
        </SidebarItem>
      </div>
      <div
        className={`resizable-line left ${isResizing ? 'resizing' : ''} `}
        onMouseDown={enableResize}
      />
    </SidebarDiv>
  );
};
