/* global window */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {Table} from 'reactstrap';
import {get, map, uniqueId} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Pages from './Pages';
import Item from './Item';
import MobileItem from './MobileItem';


/**
 * @param {Object} Object
 * @param {Array} Object.headers
 *
 * @param {columns}
 * @example
 * [
 *   {
 *      text: 'Nombre',
 *      label: 'user.name'
 *   },
 *   {
 *       text: 'Apellido',
 *       label: 'user.surname'
 *   },
 *   {
 *       text: 'Email',
 *       label: 'user.email'
 *   },
 *   {
 *       text: 'Celular',
 *       label: 'user.phone'
 *   },
 *   {
 *       text: 'CUIT',
 *       label: 'company[cuit]'
 *   },
 *   {
 *       text: 'Cargo',
 *       label: 'user.position'
 *   },
 *   {
 *       draw: true,
 *       detail: true,
 *       noInfo: true,
 *       label: ['user.name', 'user.surname']
 *   },
 *   {
 *       draw: true,
 *       noInfo: true,
 *       text: 'Empresa',
 *       label: ['company.businessName', 'company.cuit']
 *   },
 *   {
 *       draw: true,
 *       noInfo: true,
 *       label: 'Editar',
 *       linkTo: '/users/edit/'
 *   },
 *   {
 *       draw: true,
 *       noInfo: true,
 *       deleteAction: true
 *   }
 * ]
 */
const TableList = ({
    information,
    primaryKey,
    headers,
    columns,
    onDelete,
    onPageChange,
    onRecoveryPassword,
    current,
    total
}) => {
    const [isMobile, setIsMobile] = useState(false);
    let widthOutput = window.innerWidth;
    if (widthOutput < 1000 && !isMobile) {
        setIsMobile(true);
    }

    if (widthOutput > 999 && isMobile) {
        setIsMobile(false);
    }
    function reportWindowSize() {
        widthOutput = window.innerWidth;

        if (widthOutput < 1000 && !isMobile) {
            setIsMobile(true);
        }

        if (widthOutput > 999 && isMobile) {
            setIsMobile(false);
        }
    }

    window.onresize = reportWindowSize;

    if (isMobile) {
        return (
            <>
                {map(information, info => (
                    <MobileItem
                        info={info}
                        key={get(info, primaryKey)}
                        primaryKey={get(info, primaryKey)}
                        columns={columns}
                        onDelete={onDelete}
                        onRecoveryPassword={onRecoveryPassword}
                        headers={headers}
                    />
                ))}
                <Pages
                    maxPage={0}
                    selectedPage={current}
                    hideTotals
                    resultsCount={total}
                    onChange={page => onPageChange(page)}
                />
            </>
        );
    }
    return (
        <Table
            className="table-vertical-middle"
            bordered
            hover
            striped
            size="large"
        >
            <thead>
                <tr>
                    {map(headers, header => (
                        <th key={uniqueId('indexDetail')}>
                            {header.icon && (<FontAwesomeIcon icon={header.icon}/>)}
                            {header.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {map(information, info => (
                    <Item
                        info={info}
                        key={get(info, primaryKey)}
                        primaryKey={get(info, primaryKey)}
                        columns={columns}
                        onDelete={onDelete}
                        onRecoveryPassword={onRecoveryPassword}
                    />
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={headers.length}>
                        <Pages
                            maxPage={20}
                            paginationSize={50}
                            selectedPage={current}
                            resultsCount={total}
                            onChange={page => onPageChange(page)}
                        />
                    </td>
                </tr>
            </tfoot>
        </Table>
    );
};

export default TableList;
