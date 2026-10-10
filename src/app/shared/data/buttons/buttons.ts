export interface Button {
    Title: string;
    data: item[];
}
export interface item {
    class: string;
    text: string;
    btn: string;
}

export const buttonSizeData = [
    {
        Title: 'Default Size',
        data: [
            {
                class: 'btn-primary',
                text: 'Primary Button',
            },
            {
                class: 'btn-secondary',
                text: 'Secondary Button',
            },
            {
                class: 'btn-tertiary',
                text: 'Tertiary Button',
            },
            {
                class: 'btn-success',
                text: 'Success Button',
            },
            {
                class: 'btn-info',
                text: 'Info Button',
            },
            {
                class: 'btn-warning',
                text: 'Warning Button',
            },
            {
                class: 'btn-danger',
                text: 'Danger Button',
            },
            {
                class: 'font-dark btn-light',
                text: 'Light Button',
            },
            {
                class: 'btn-dark',
                text: 'Dark Button',
            }
        ]
    },
    {
        Title: 'Large Size',
        data: [
            {
                class: 'btn-primary',
                text: 'Primary Button',
            },
            {
                class: 'btn-secondary',
                text: 'Secondary Button',
            },
            {
                class: 'btn-tertiary',
                text: 'Tertiary Button',
            },
            {
                class: 'btn-success',
                text: 'Success Button',
            },
            {
                class: 'btn-info',
                text: 'Info Button',
            },
            {
                class: 'btn-warning',
                text: 'Warning Button',
            },
            {
                class: 'btn-danger',
                text: 'Danger Button',
            },
            {
                class: 'font-dark btn-light',
                text: 'Light Button',
            },
            {
                class: 'btn-dark',
                text: 'Dark Button',
            }
        ]
    },
    {
        Title: 'Small Size',
        data: [
            {
                class: 'btn-primary',
                text: 'Primary Button',
            },
            {
                class: 'btn-secondary',
                text: 'Secondary Button',
            },
            {
                class: 'btn-tertiary',
                text: 'Tertiary Button',
            },
            {
                class: 'btn-success',
                text: 'Success Button',
            },
            {
                class: 'btn-info',
                text: 'Info Button',
            },
            {
                class: 'btn-warning',
                text: 'Warning Button',
            },
            {
                class: 'btn-danger',
                text: 'Danger Button',
            },
            {
                class: 'font-dark btn-light',
                text: 'Light Button',
            },
            {
                class: 'btn-dark',
                text: 'Dark Button', 
            }
        ]
    },
    {
        Title: 'Extra Small Size',
        data: [
            {
                class: 'btn-primary',
                text: 'Primary Button',
            },
            {
                class: 'btn-secondary',
                text: 'Secondary Button',
            },
            {
                class: 'btn-tertiary',
                text: 'Tertiary Button',
            },
            {
                class: 'btn-success',
                text: 'Success Button',
            },
            {
                class: 'btn-info',
                text: 'Info Button',
            },
            {
                class: 'btn-warning',
                text: 'Warning Button',
            },
            {
                class: 'btn-danger',
                text: 'Danger Button',
            },
            {
                class: 'font-dark btn-light',
                text: 'Light Button',
            },
            {
                class: 'btn-dark',
                text: 'Dark Button',
            }
        ]
    }
]

export const buttonDefaultStyle: Button[] = [
    {
        Title: 'Default Buttons',
        data: [
            {
                class: 'm-1 btn-primary',
                text: 'Primary Button',
                btn: 'btn-primary'
            },
            {
                class: 'm-1 btn-secondary',
                text: 'Secondary Button',
                btn: 'btn-secondary'
            },
            {
                class: 'm-1 btn-tertiary',
                text: 'Tertiary Button',
                btn: 'btn-tertiary'
            },
            {
                class: 'm-1 btn-success',
                text: 'Success Button',
                btn: 'btn-success'
            }
            ,
            {
                class: 'm-1 btn-info',
                text: 'Info Button',
                btn: 'btn-info'
            }
            ,
            {
                class: 'm-1 btn-warning',
                text: 'Warning Button',
                btn: 'btn-warning'
            }
            ,
            {
                class: 'm-1 btn-danger',
                text: 'Danger Button',
                btn: 'btn-danger'
            }
            ,
            {
                class: 'm-1 font-dark btn-light',
                text: 'Light Button',
                btn: 'btn-light'
            },
            {
                class: 'm-1 btn-dark',
                text: 'Dark Button',
                btn: 'btn-dark'
            }
        ]
    },
]

export const ButtonFaltstyle: Button[] = [
    {
        Title: 'Flat Buttons',
        data: [
            {
                class: 'm-1 flat-btn btn-primary',
                text: 'Primary Button',
                btn: 'flat-btn btn-primary'
            },
            {
                class: 'm-1 flat-btn btn-secondary',
                text: 'Secondary Button',
                btn: 'flat-btn btn-secondary'
            },
            {
                class: 'm-1 flat-btn btn-tertiary',
                text: 'Tertiary Button',
                btn: 'flat-btn btn-tertiary'
            },
            {
                class: 'm-1 flat-btn btn-success',
                text: 'Success Button',
                btn: 'flat-btn btn-success'
            }
            ,
            {
                class: 'm-1 flat-btn btn-info',
                text: 'Info Button',
                btn: 'flat-btn btn-info'
            }
            ,
            {
                class: 'm-1 flat-btn btn-warning',
                text: 'Warning Button',
                btn: 'flat-btn btn-warning'
            }
            ,
            {
                class: 'm-1 flat-btn btn-danger',
                text: 'Danger Button',
                btn: 'flat-btn btn-danger'
            }
            ,
            {
                class: 'm-1 font-dark flat-btn btn-light',
                text: 'Light Button',
                btn: 'flat-btn btn-light'
            },
            {
                class: 'm-1 flat-btn btn-dark',
                text: 'Dark Button',
                btn: 'flat-btn btn-dark'
            }
        ]
    },
]

export const buttonEdgeStyle: Button[] = [
    {
        Title: 'Edge Buttons',
        data: [
            {
                class: 'm-1 edge-btn btn-primary',
                text: 'Primary Button',
                btn: 'edge-btn btn-primary'
            },
            {
                class: 'm-1 edge-btn btn-secondary',
                text: 'Secondary Button',
                btn: 'edge-btn btn-secondary'
            },
            {
                class: 'm-1 edge-btn btn-tertiary',
                text: 'Tertiary Button',
                btn: 'edge-btn btn-tertiary'
            },
            {
                class: 'm-1 edge-btn btn-success',
                text: 'Success Button',
                btn: 'edge-btn btn-success'
            }
            ,
            {
                class: 'm-1 edge-btn btn-info',
                text: 'Info Button',
                btn: 'edge-btn btn-info'
            }
            ,
            {
                class: 'm-1 edge-btn btn-warning',
                text: 'Warning Button',
                btn: 'edge-btn btn-warning'
            }
            ,
            {
                class: 'm-1 edge-btn btn-danger',
                text: 'Danger Button',
                btn: 'edge-btn btn-danger'
            },
            {
                class: 'm-1 font-dark edge-btn btn-light',
                text: 'Light Button',
                btn: 'edge-btn btn-light'
            },
            {
                class: 'm-1 edge-btn btn-dark',
                text: 'Dark Button',
                btn: 'edge-btn btn-dark'
            }
        ]
    }
]

export const buttonRaisedStyle: Button[] = [
    {
        Title: 'Raised Buttons',
        data: [
            {
                class: 'm-1 btn-primary btn-raised-primary',
                text: 'Primary Button',
                btn: 'btn-primary btn-raised-primary'
            },
            {
                class: 'm-1 btn-secondary btn-raised-secondary',
                text: 'Secondary Button',
                btn: 'btn-secondary btn-raised-secondary'
            },
            {
                class: 'm-1 btn-tertiary btn-raised-tertiary',
                text: 'Tertiary Button',
                btn: 'btn-tertiary btn-raised-tertiary'
            },
            {
                class: 'm-1 btn-success btn-raised-success',
                text: 'Success Button',
                btn: 'btn-success btn-raised-success'
            }
            ,
            {
                class: 'm-1 btn-info btn-raised-info',
                text: 'Info Button',
                btn: 'btn-info btn-raised-info'
            }
            ,
            {
                class: 'm-1 btn-warning btn-raised-warning',
                text: 'Warning Button',
                btn: 'btn-warning btn-raised-warning '
            }
            ,
            {
                class: 'm-1 btn-danger btn-raised-danger',
                text: 'Danger Button',
                btn: 'btn-danger btn-raised-danger'
            },
            {
                class: 'm-1 font-dark btn-light btn-raised-light',
                text: 'Light Button',
                btn: 'btn-light btn-raised-light'
            },
            {
                class: 'm-1 btn-dark btn-raised-dark',
                text: 'Dark Button',
                btn: 'btn-dark btn-raised-dark'
            }
        ]
    }
]

export const buttonOutlineStyle: Button[] = [
    {
        Title: 'Outline Buttons',
        data: [
            {
                class: 'm-1 btn-outline-primary',
                text: 'Primary Button',
                btn: 'btn-outline-primary'
            },
            {
                class: 'm-1 btn-outline-secondary',
                text: 'Secondary Button',
                btn: 'btn-outline-secondary'
            },
            {
                class: 'm-1 btn-outline-tertiary',
                text: 'Tertiary Button',
                btn: 'btn-outline-tertiary'
            },
            {
                class: 'm-1  btn-outline-success',
                text: 'Success Button',
                btn: 'btn-outline-success'
            }
            ,
            {
                class: 'm-1  btn-outline-info',
                text: 'Info Button',
                btn: 'btn-outline-info'
            }
            ,
            {
                class: 'm-1 btn-outline-warning',
                text: 'Warning Button',
                btn: 'btn-outline-warning'
            }
            ,
            {
                class: 'm-1 btn-outline-danger',
                text: 'Danger Button',
                btn: 'btn-outline-danger'
            },
            {
                class: 'm-1 font-dark btn-outline-light',
                text: 'Light Button',
                btn: 'btn-outline-light'
            },
            {
                class: ' m-1 btn-outline-dark',
                text: 'Dark Button',
                btn: 'btn-outline-dark'
            }
        ]
    }
]

export const buttonGradientStyle: Button[] = [
    {
        Title: 'Gradient Buttons',
        data: [
            {
                class: 'm-1 btn-primary btn-primary-gradien',
                text: 'Primary Button',
                btn: 'btn-primary btn-primary-gradien'
            },
            {
                class: 'm-1 btn-secondary btn-secondary-gradien',
                text: 'Secondary Button',
                btn: 'btn-secondary btn-secondary-gradien'
            },
            {
                class: 'm-1 btn-tertiary btn-tertiary-gradien',
                text: 'Tertiary Button',
                btn: 'btn-tertiary btn-tertiary-gradien'
            },
            {
                class: 'm-1 btn-success btn-success-gradien',
                text: 'Success Button',
                btn: 'btn-success btn-success-gradien'
            }
            ,
            {
                class: 'm-1 btn-info btn-info-gradien',
                text: 'Info Button',
                btn: 'btn-info btn-info-gradien'
            }
            ,
            {
                class: 'm-1 btn-warning btn-warning-gradien',
                text: 'Warning Button',
                btn: 'btn-warning btn-warning-gradien'
            }
            ,
            {
                class: 'm-1 btn-danger btn-danger-gradien',
                text: 'Danger Button',
                btn: 'btn-danger btn-danger-gradien'
            },
            {
                class: 'm-1 font-dark btn-light btn-light-gradien',
                text: 'Light Button',
                btn: 'btn-light btn-light-gradien'
            },
            {
                class: 'm-1 btn-dark btn-dark-gradien',
                text: 'Dark Button',
                btn: 'btn-dark btn-dark-gradien'
            }
        ]
    }
]