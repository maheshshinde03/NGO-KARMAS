export const PermissionsActions = {
    CREATE: { value: 1, name: 'create' },
    EDIT: { value: 2, name: 'edit' },
    DELETE: { value: 4, name: 'delete' },
    VIEW: { value: 8, name: 'view' },
    UNLOCK: { value: 16, name: 'unlock' },
    LOCK: { value: 21, name: 'lock' },
    UPLOAD: { value: 32, name: 'upload' },
    PROCEED: { value: 64, name: 'Proceed' },
    CREATE_JOB_ID: { value: 128, name: 'create_job_id' },
    CAN_ADD_OTHER_SERVICE: { value: 256, name: 'can_add_other_service' },
    SEND_TO_PMS: { value: 512, name: 'send_to_PMS' },
    APPROVE: { value: 1024, name: 'approved' },
    REJECT: { value: 2048, name: 'reject' },
    ROLLBACK: { value: 4096, name: 'rollback' },
    CAN_RELEASED_JOB_ID: { value: 8192, name: 'can_released_job_id' }
  };
  