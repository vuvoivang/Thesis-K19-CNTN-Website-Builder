import { useEditor } from 'libs/core/src';
import cx from 'classnames';
import React, { useEffect } from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toolbox } from './Toolbox';
import { PROJECT } from 'services/user';

type ViewportProps = {
  children?: React.ReactNode;
}
export const Viewport: React.FC<ViewportProps> = ({ children }) => {
  const {
    enabled,
    connectors,
    actions: { setOptions },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        '*'
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <div className='viewport w-full fixed'>
      <Header />
      <div className={cx(['flex h-full overflow-hidden flex-row w-full fixed'])}>
        <Toolbox />
        <div className='page-container flex flex-1 h-full flex-col px-8 overflow-auto'>
          <div
            className={cx([
              'craftjs-renderer flex-1 w-full transition pb-8',
              {
                'bg-renderer-gray': enabled,
              },
            ])}
            ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
          >
            <div className='relative flex-col flex items-center pt-8' id='app-container'>
              {children}
            </div>
            <div style={{ height: 200 }} className={'flex items-center justify-center w-full pt-6 fw-bold'}>
              <a href='https://hcmus.edu.vn/'>HCMUS - Software Architecture</a>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};
