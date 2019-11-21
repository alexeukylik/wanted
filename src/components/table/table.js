import React from 'react';
import Radio from '../radio/radio';
import { setNewChangeRadio } from '../../modules/Profile/actions/profile.actions';
import Button from '../button/button';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { arrVolume } from '../../helpers/category';

const Table = (props) => {
    const handleChangeRadio = (e, id) => props.dispatch(setNewChangeRadio(id));

    const disabledBtn = e => {
        if (props.counter < 3) {
            e.currentTarget.disabled = true;
            e.currentTarget.style.pointerEvents = 'none';
        }
    };

    const blockElement = (id) => {
        let blockNone;
        props.main.table_row_id.forEach(elementId => elementId === id ? blockNone = true: '');
        return blockNone;
    };

    return (
        <React.Fragment>
            {props.data.lists.length > 0 ?
                <table className='table' border='1' width='100%'>
                    <thead>
                        <tr>
                            {!props.table && <th><FormattedMessage id='select' /></th>}
                            <th><FormattedMessage id='what_doc' /></th>
                            <th><FormattedMessage id='title' /></th>
                            <th><FormattedMessage id='what_number' /></th>
                            <th><FormattedMessage id='owner' /></th>
                            <th><FormattedMessage id='what_date' /></th>
                            <th><FormattedMessage id='what_validity' /></th>
                            <th><FormattedMessage id='issued' /></th>
                            {props.table && <th><FormattedMessage id='action' /></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.lists.length > 0 ? props.data.lists.map((el, index) => {
                            return (
                                <tr style={{ display: `${blockElement(el.id) ? 'none' : 'table-row'}`}}
                                    key={el.id}>
                                    {!props.table && <td>
                                        <Radio custom='radio' type='radio' name='document' id={props.main.category_doc}
                                            onChange={(e) => handleChangeRadio(e, el.id)}
                                            value={el.id}
                                            checked={el.id === props.main.document_found_id}
                                        />
                                    </td>}
                                    <td><FormattedHTMLMessage id={arrVolume[el.category_id - 1].category} /></td>
                                    <td>{el.extra.title !== 'null' ? el.extra.title : ''}</td>
                                    <td>{el.extra.number !== 'null' ? el.extra.number : ''}</td>
                                    <td>{el.owner !== 'null' ? decodeURI(el.owner) : ''}</td>
                                    <td>{el.extra.data !== 'null' ? el.extra.data : ''}</td>
                                    <td>{el.extra.validity !== 'null' ? el.extra.validity : ''}</td>
                                    <td>{el.extra.organization !== 'null' ? el.extra.organization : ''}</td>
                                    {
                                        props.table &&
                                        <React.Fragment>
                                            <td>
                                                <div className='icon-wrap'>
                                                    <Button className='icon icon_edit' onClick={(e) => {
                                                        props.editTable(e, el);
                                                    }}>
                                                        <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M13 17l9-9-6-6-9 9m6 6H7v-6m6 6l-6-6m5-10H3v22h18v-9' stroke='#B3B6BA' strokeWidth='2' />
                                                        </svg>
                                                    </Button>
                                                    <Button className='icon icon_delete' onClick={(e) => {
                                                        props.deleteTable(e, el.id);
                                                        disabledBtn(e, el.category_id);
                                                    }}>
                                                        <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                            <path stroke='#B3B6BA' strokeWidth='2' strokeLinecap='round' d='M4 5h16v18H4z' />
                                                            <path d='M22 5H2m6 0V1h8v4' stroke='#B3B6BA' strokeWidth='2' strokeLinecap='square' />
                                                            <path d='M8 8v12m4-12v12m4-12v12' stroke='#B3B6BA' strokeWidth='2' strokeLinejoin='round' />
                                                        </svg>
                                                    </Button>
                                                </div>
                                            </td>
                                        </React.Fragment>
                                    }
                                </tr>
                            );
                        }) : ''}
                    </tbody>
                </table> : <FormattedMessage id={`${props.found ? 'no_founds' : 'no_docs'}`} />}

            {props.data.lists.length > 0 ? props.data.lists.map((el, index) => {
                return (
                    <table className='table mobile' border='1' width='100%' key={el.id} style={{display: `${blockElement(el.id) ? 'none' : ''}`}}>
                        <tbody>
                            <tr>
                                <td><FormattedMessage id='what_doc' /></td>
                                <td><FormattedHTMLMessage id={el.category_id} /></td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id='title' /></td>
                                <td>{el.extra.title !== 'null' ? el.extra.title : ''}</td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id='what_number' /></td>
                                <td>{el.extra.number !== 'null' ? el.extra.number : ''}</td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id='owner' /></td>
                                <td>{el.owner !== 'null' ? decodeURI(el.owner) : ''}</td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id='what_date' /></td>
                                <td>{el.extra.data !== 'null' ? el.extra.data : ''}</td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id='what_validity' /></td>
                                <td>{el.extra.validity !== 'null' ? el.extra.validity : ''}</td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id='issued' /></td>
                                <td>{el.extra.organization !== 'null' ? el.extra.organization : ''}</td>
                            </tr>
                            <tr>
                                {
                                    props.table ?
                                        <React.Fragment>
                                            <td colSpan='2'>
                                                <div className='icon-wrap'>
                                                    <Button className='icon icon_edit' onClick={(e) => {
                                                        props.editTable(e, el);
                                                    }}>
                                                        <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M13 17l9-9-6-6-9 9m6 6H7v-6m6 6l-6-6m5-10H3v22h18v-9' stroke='#B3B6BA' strokeWidth='2' />
                                                        </svg>
                                                        <span><FormattedMessage id='edit' /></span>
                                                    </Button>
                                                    <Button className='icon icon_delete' onClick={(e) => {
                                                        props.deleteTable(e, el.id);
                                                        disabledBtn(e, el.category_id);
                                                    }}>
                                                        <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                            <path stroke='#B3B6BA' strokeWidth='2' strokeLinecap='round' d='M4 5h16v18H4z' />
                                                            <path d='M22 5H2m6 0V1h8v4' stroke='#B3B6BA' strokeWidth='2' strokeLinecap='square' />
                                                            <path d='M8 8v12m4-12v12m4-12v12' stroke='#B3B6BA' strokeWidth='2' strokeLinejoin='round' />
                                                        </svg>
                                                        <span><FormattedMessage id='remove' /></span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </React.Fragment> :
                                        <React.Fragment>
                                            <td colSpan='2'>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Radio custom='radio' type='radio' name='document'
                                                        id={props.main.category_doc}
                                                        onChange={(e) => handleChangeRadio(e, el.id)}
                                                        value={el.id}
                                                        checked={el.id === props.main.document_found_id} />&nbsp;
                                                    <span><FormattedMessage id='select' /></span>
                                                </div>
                                            </td>
                                        </React.Fragment>
                                }
                            </tr>
                        </tbody>
                    </table>
                );
            }) : ''}
        </React.Fragment>
    );
};

export default Table;
