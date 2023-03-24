import { useEditor } from 'libs/core/src';
import {
  Tooltip,
  // FormControl,
  // Select,
  Button as MaterialButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  MenuItem,
} from '@material-ui/core';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import cx from 'classnames';
import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { ROOT_PATH, serializedContainerRootNodeForPage } from 'libs/utils/src';

import axios from 'axios';
import Checkmark from '../../../public/icons/check.svg';
import Customize from '../../../public/icons/customize.svg';
import RedoSvg from '../../../public/icons/toolbox/redo.svg';
import UndoSvg from '../../../public/icons/toolbox/undo.svg';
import Logo from '../../../public/images/logo.webp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/Remove';
import { LightTooltip } from 'display/shared/components/Tooltip';
import lz from 'lzutf8';
import copy from 'copy-to-clipboard';
import Image from 'next/image';

import _var from '../../styles/common/_var.module.scss';

const HeaderDiv = styled.div<any>`
  width: 100%;
  height: 48px;
  z-index: 0;
  position: relative;
  padding: 0px 10px;
  background: ${_var.whiteColor};
  display: flex;
  border-bottom: 2px solid ${_var.borderBottomColor};
`;

const Btn = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 4px;
  color: ${_var.blackColor};
  font-size: 15px;
  svg {
    margin-right: 6px;
    width: 12px;
    height: 12px;
    fill: ${_var.blackColor};
    opacity: 1;
  }
  &:hover {
    background-color: ${_var.grayDarkColor};
    color: ${_var.whiteColor};
    svg {
      fill: ${_var.whiteColor};
    }
  }
  &.btn-gen-code{
    color: ${_var.whiteColor};
    &:hover {
      background-color: ${_var.blueDarkColor};
    }
  }
`;

const PageFormControl = styled(FormControl)`
  min-width: 180px;
  margin: 16px;
  display: flex;
  flex-direction: row !important;
`;

function addPageReducer(state, action) {
  if (action.type === 'UPDATE_PATH') {
    return {
      ...state,
      path: action.data,
    };
  } else if (action.type === 'UPDATE_NAME') {
    return {
      ...state,
      name: action.data,
    };
  }
  throw Error('Unknown action.');
}

export const Header = () => {
  const [openDialogNewPage, setOpenDialogNewPage] = useState(false);
  const [addPage, dispatch] = useReducer(addPageReducer, {
    path: '',
    name: '',
  });
  const [openDialogLoadState, setOpenDialogLoadState] = useState(false);
  const [stateToLoad, setStateToLoad] = useState<string>('');

  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
  const [deletingPagePath, setDeletingPagePath] = useState('');

  const {
    enabled,
    canUndo,
    canRedo,
    actions,
    query,
    isShownAllIndicator = false,
    pages,
    currentPage,
  } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    isShownAllIndicator: state.options.isShownAllIndicator,
    pages: state.pageOptions.pages,
    currentPage: state.pageOptions.currentPage,
  }));

  const handleChangePage = (event) => {
    actions.setCurrentPage(event.target.value as string);
  };

  const clickOpenDialogAddNewPage = () => {
    handleClickOpenDialogNewPage();
  };

  const handleClickOpenDialogNewPage = () => {
    setOpenDialogNewPage(true);
  };
  const handleCloseDialogNewPage = () => {
    setOpenDialogNewPage(false);
  };
  const handleAddPage = () => {
    handleCloseDialogNewPage();
    actions.addNewPage(addPage);

    // add new container root node for new page
    const newContainerRootNodeInNewPage = {
      ...serializedContainerRootNodeForPage,
      page: addPage.path,
    };
    const rootNodeIdInNewPage = `ROOT_${addPage.path.slice(1)}`;
    actions.addNewNodeWithSerializedData(newContainerRootNodeInNewPage, rootNodeIdInNewPage);

    setTimeout(() => {
      actions.setCurrentPage(addPage.path);
    }, 500);
  };
  const handleDeletePageSelectItem = (path) => {
    setDeletingPagePath(path);
  };

  useEffect(() => {
    if (deletingPagePath) {
      handleClickOpenDialogConfirmDelete();
    }
  }, [deletingPagePath]);

  const handleClickOpenDialogConfirmDelete = () => {
    setOpenDialogConfirmDelete(true);
  };

  const handleCloseDialogConfirmDelete = () => {
    setOpenDialogConfirmDelete(false);
    setDeletingPagePath('');
  };

  const handleDeletePageDialog = () => {
    actions.deletePage(deletingPagePath);
    handleCloseDialogConfirmDelete();
  };

  const handleGenerateCode = async () => {
    type Page = {
      path: string;
      name: string;
    };
    type Node = {
      id: string;
      type: string;
      props: string;
      displayName: string;
      hidden: boolean;
      children: Array<string>;
      pagePath: string;
    };
    let pages = new Array<Page>();
    let nodes = new Array<Node>();

    // get pages info
    for (const page of query.getState().pageOptions.pages) {
      pages.push({ path: page.path, name: page.name });
    }

    // get nodes info

    let serializeNodes = query.getSerializedNodes();

    for (const id in serializeNodes) {
      let serializeNode = serializeNodes[id];
      let type = serializeNode.type;
      let typeName = '';
      if (typeof type === 'object' && type.resolvedName) {
        typeName = type.resolvedName;
      } else continue;

      let node: Node = {
        id: id,
        type: typeName.replace('Craft', ''),
        props: JSON.stringify(serializeNode.props),
        displayName: serializeNode.custom?.displayName ? serializeNode.custom?.displayName : serializeNode.displayName,
        hidden: serializeNode.hidden,
        children: serializeNode.nodes,
        pagePath: serializeNode.page,
      };

      nodes.push(node);
    }

    console.log({ nodes, pages });

    // call api
    await axios
      .post(
        'http://localhost:3003/api/gen-react-code',
        {
          nodes,
          pages,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    // await axios.get('http://localhost:3003/api/hello-world').then((res) => {
    //   console.log(res);
    //   console.log(res.data);
    // });
  };

  return (
    <HeaderDiv id='header' className='header text-white transition w-full'>
      <div className='items-center flex w-full pl-4 justify-space-between'>
        <a href='/' className='logo-container flex items-center' style={{ width: '200px' }}>
          <Image className='header-logo' src={Logo} alt='Our Logo' height={48} width={80} />
          <span className='self-center text-xl font-bold whitespace-nowrap text-stone-600'>Buildify</span>
        </a>
        {/* Form add new page  */}
        <PageFormControl className='pt-4'>
          <div className='add-page-container flex items-center'>
            <LightTooltip title='Add new page'>
              <AddCircleIcon
                className='cursor-pointer mr-3 text-green-500'
                onClick={clickOpenDialogAddNewPage}
                fontSize='small'
              />
            </LightTooltip>
            <Select
              value={currentPage}
              onChange={handleChangePage}
              inputProps={{
                name: 'current-page-select',
                id: 'current-page',
              }}
              className='page-select global-select'
              renderValue={(value) => pages.find((el) => el.path === value)?.name + ' page'}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} value={page.path} className='custom-menu-item'>
                  {page.name}
                  {/* Can't remove home page */}
                  {page.path !== ROOT_PATH && (
                    <RemoveIcon
                      fontSize='small'
                      className='rm-icon bg-red-500 hover:bg-red-600'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePageSelectItem(page.path);
                      }}
                    />
                  )}
                </MenuItem>
              ))}
            </Select>
          </div>
        </PageFormControl>

        {/* Undo and Redo  */}
        {enabled && (
          <div className='flex'>
            <Tooltip title='Undo' placement='bottom'>
              <a
                className='action-ic'
                style={{
                  cursor: canUndo ? 'pointer' : 'not-allowed',
                  opacity: canUndo ? 1 : 0.5,
                }}
                onClick={() => actions.history.undo()}
              >
                <UndoSvg />
              </a>
            </Tooltip>
            <Tooltip title='Redo' placement='bottom'>
              <a
                className='action-ic'
                style={{
                  cursor: canRedo ? 'pointer' : 'not-allowed',
                  opacity: canRedo ? 1 : 0.5,
                }}
                onClick={() => actions.history.redo()}
              >
                <RedoSvg />
              </a>
            </Tooltip>
          </div>
        )}
        <div className='flex-1 flex' />

        <div className='actions-group flex'>
          <Btn
            className={cx([
              'transition cursor-pointer',
              {
                '': enabled,
                'bg-gray-50': !enabled,
              },
            ])}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
          >
            {enabled ? <Checkmark /> : <Customize />}
            {enabled ? 'Finish Editing' : 'Edit'}
          </Btn>

          <Btn
            className='ml-2 transition cursor-pointer'
            onClick={() => {
              console.log(
                'Node tree',
                query.getSerializedNodes(),
                'length',
                Object.keys(query.getSerializedNodes()).length
              );
              console.log('State', query.getState());
              console.log('Serialized data', query.serialize());
            }}
          >
            Debug
          </Btn>

          <Btn
            className='ml-2 transition cursor-pointer'
            onClick={() => {
              const json = query.serialize();
              copy(lz.encodeBase64(lz.compress(json)));
            }}
          >
            Copy state
          </Btn>

          <Btn className='ml-2 transition cursor-pointer' onClick={() => setOpenDialogLoadState(true)}>
            Load state
          </Btn>

          <Btn
            className='ml-2 transition cursor-pointer'
            onClick={() => {
              actions.setOptions((options) => (options.isShownAllIndicator = !isShownAllIndicator));
            }}
          >
            {!isShownAllIndicator ? ' Show indicators' : 'Hide indicators'}
          </Btn>

          <Btn
            className='ml-2 transition cursor-pointer btn-gen-code bg-sky-600'
            onClick={async () => await handleGenerateCode()}
          >
            Generate Code
          </Btn>
        </div>
      </div>

      {/* Dialog add new page infor */}

      <Dialog open={openDialogNewPage} onClose={handleCloseDialogNewPage} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>New Page Information</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter new path and name for your page:</DialogContentText>
          <ul className='dialog-new-page'>
            <li>Path: specific path for pages' routing, must start with /. Ex: /example</li>
            <li>Name: specific name for corresponding page, use as title. Ex: Example</li>
          </ul>

          <TextField
            margin='dense'
            id='path'
            label='Page Path'
            type='text'
            fullWidth
            onChange={(e) => {
              dispatch({ type: 'UPDATE_PATH', data: e.target.value });
            }}
          />
          <TextField
            margin='dense'
            id='name'
            label='Page Name'
            type='text'
            fullWidth
            onChange={(e) => {
              dispatch({ type: 'UPDATE_NAME', data: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <MaterialButton
            onClick={handleCloseDialogNewPage}
            style={{
              backgroundColor: _var.redColor,
              color: _var.whiteColor,
              padding: '6px',
              borderRadius: '6px',
              margin: '10px 0 10px 0',
            }}
          >
            Cancel
          </MaterialButton>
          <MaterialButton
            onClick={handleAddPage}
            style={{
              backgroundColor: _var.greenColor,
              color: _var.whiteColor,
              padding: '6px',
              borderRadius: '6px',
              margin: '10px 14px 10px 10px',
            }}
          >
            Done
          </MaterialButton>
        </DialogActions>
      </Dialog>

      {/* Dialog load state (copied) */}
      <Dialog open={openDialogLoadState} onClose={() => setOpenDialogLoadState(false)} fullWidth maxWidth='md'>
        <DialogTitle id='alert-dialog-title'>Load state</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            placeholder='Paste the contents that was copied from the "Copy Current State" button'
            value={stateToLoad}
            onChange={(e) => setStateToLoad(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <MaterialButton onClick={() => setOpenDialogLoadState(false)} color='secondary'>
            Cancel
          </MaterialButton>
          <MaterialButton
            onClick={() => {
              setOpenDialogLoadState(false);
              const json = lz.decompress(lz.decodeBase64(stateToLoad));
              actions.deserialize(json);
            }}
            color='primary'
            autoFocus
          >
            Load
          </MaterialButton>
        </DialogActions>
      </Dialog>

      {/* Dialog confirm deleting page */}

      <Dialog
        open={openDialogConfirmDelete}
        aria-labelledby='delete-page-dialog-title'
        aria-describedby='delete-page-dialog-description'
      >
        <DialogTitle id='delete-page-dialog-title'>
          Delete {pages.find((el) => el.path === deletingPagePath)?.name} page
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-page-dialog-description'>
            This action cannot be undone. Delete this page will permanently delete all its elements you've designed. Are
            you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MaterialButton onClick={handleCloseDialogConfirmDelete} color='secondary'>
            Cancel
          </MaterialButton>
          <MaterialButton onClick={handleDeletePageDialog} color='primary'>
            Sure
          </MaterialButton>
        </DialogActions>
      </Dialog>
    </HeaderDiv>
  );
};
