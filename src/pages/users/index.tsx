import { PlusOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, message,Modal } from 'antd';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { userList} from '@/services/ant-design-pro/user';

const { confirm } = Modal;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
 const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    console.log('调用新增接口')
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * 删除用户功能
 */
function showDeleteConfirm() {
  confirm({
    title: 'Are you sure delete this user?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}





const Users = () => {

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const actionRef = useRef<ActionType>();

  console.log(userList.userList);
  console.log('接口调用');


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'username',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'IsAdmin',
      dataIndex: 'isAdmin',
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
    },
    {
      title: 'createBy',
      dataIndex: 'createBy',
    },
    {
      title: 'updateTime',
      dataIndex: 'updateTime',
    },
    {
      title: 'updateBy',
      dataIndex: 'updateBy',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            console.log('edit')
          }}
        >
          <FormattedMessage id="pages.edit" defaultMessage="edit" />
        </a>,
        <a 
          key="subscribeAlert" 
          onClick={showDeleteConfirm}
        >
          <FormattedMessage
            id="pages.remove"
            defaultMessage="remove"
          />
        </a>,
      ],
    },
  ];


  return (
    <PageContainer>
      <ProTable<API.UserList,API.PageParamsV2>
            headerTitle="查询表格"
            actionRef={actionRef}
            rowKey="id"
            columns={columns}
            dataSource={userList.userList}
            toolBarRender={() => [
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  handleModalVisible(true);
                }}
              >
                <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
              </Button>,
            ]}
        />


      <ModalForm
        title={intl.formatMessage({
          id: 'pages.user.createForm.newUser',
          defaultMessage: 'New User',
        })}
        width="800px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
      <ProFormText
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.ruleName"
                defaultMessage="Rule name is required"
              />
            ),
          },
        ]}
        width="md"
        name="name2"
        
      />
      <ProFormTextArea width="md" name="desc" />
    </ModalForm>


    </PageContainer>
    
  );
};

export default Users;


function handleModalVisible(arg0: boolean) {
  throw new Error('Function not implemented.');
}

