/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { Input, TextArea, Select } from '@pitrix/lego-ui'
import { PATTERN_NAME } from 'utils/constants'
import { Form } from 'components/Base'

import SubTitle from '../SubTitle'

export default class BaseInfo extends React.Component {
  get groups() {
    return [
      {
        label: t('production'),
        value: 'production',
      },
      {
        label: t('development'),
        value: 'development',
      },
    ]
  }

  get providers() {
    return [
      {
        label: 'Amazon',
        value: 'Amazon',
        icon: 'aws',
      },
      {
        label: 'QingCloud',
        value: 'QingCloud',
        icon: 'qingcloud',
      },
      {
        label: 'Google',
        value: 'Google',
        icon: 'google',
      },
      {
        label: 'Azure',
        value: 'Azure',
        icon: 'windows',
      },
      {
        label: 'Custom',
        value: 'Custom',
        icon: 'kubernetes',
      },
    ]
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store.checkName({ name: value }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Name exists'), field: rule.field })
      }
      callback()
    })
  }

  render() {
    return (
      <div>
        <SubTitle
          title={t('Cluster Settings')}
          description={t('CLUSTER_SETTINGS_DESC')}
        />
        <Form.Item
          label={t('Cluster Name')}
          desc={t('CLUSTER_NAME_DESC')}
          rules={[
            { required: true, message: t('Please input role name') },
            {
              pattern: PATTERN_NAME,
              message: `${t('Invalid name')}, ${t('CLUSTER_NAME_DESC')}`,
            },
            { validator: this.nameValidator },
          ]}
        >
          <Input name="metadata.name" />
        </Form.Item>
        <Form.Item label={t('CLUSTER_TAG')} desc={t('CLUSTER_TAG_DESC')}>
          <Select
            name="metadata.labels['cluster.kubesphere.io/group']"
            options={this.groups}
          />
        </Form.Item>
        <Form.Item label={t('Description')}>
          <TextArea name="metadata.annotations['kubesphere.io/description']" />
        </Form.Item>
        <Form.Item label={t('Provider')} desc={t('CLUSTER_PROVIDER_DESC')}>
          <Select name="spec.provider" options={this.providers} />
        </Form.Item>
      </div>
    )
  }
}