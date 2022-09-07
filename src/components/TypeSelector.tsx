import React from 'react';
import { SCRAP_QUERY_TYPES } from './../constants';
import { Select } from '@grafana/ui';
import { EditorField } from './extended/EditorField';
import type { EditorMode, InfinityQuery, InfinityQueryType } from './../types';
import type { SelectableValue } from '@grafana/data/types';

export const TypeSelector = (props: { query: InfinityQuery; onChange: (e: InfinityQuery) => void; onRunQuery: () => void; mode: EditorMode }) => {
  const { query, mode, onChange, onRunQuery } = props;
  const getTypes = (): Array<SelectableValue<InfinityQueryType>> => {
    switch (mode) {
      case 'standard':
        return SCRAP_QUERY_TYPES;
      case 'variable':
        return SCRAP_QUERY_TYPES.filter((a) => a.value !== 'series' && a.value !== 'global');
      case 'global':
        return SCRAP_QUERY_TYPES.filter((a) => a.value !== 'global');
      default:
        return [];
    }
  };
  const onTypeChange = (type: InfinityQueryType) => {
    onChange({ ...query, type } as InfinityQuery);
    onRunQuery();
  };
  return (
    <EditorField label="Type">
      <Select width={30} options={getTypes()} onChange={(e) => onTypeChange(e.value as InfinityQueryType)} value={query.type || 'json'} menuShouldPortal={true}></Select>
    </EditorField>
  );
};
