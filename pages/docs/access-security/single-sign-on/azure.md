# Azure


## Overview

You can set up Microsoft Azure Single Sign-On to use with your Mixpanel account. Before using this document, read the general Mixpanel SSO set-up instructions as well as Azure’s documentation on setting up a new application. 

### Add Mixpanel as a New Application

For more information, read [this Microsoft Azure article](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/mixpanel-provisioning-tutorial) about configuring Mixpanel for automatic user provisioning. 

1. Navigate to **Enterprise Applications** on the Microsoft Azure home page under **Default Directory**.
2. Click **New Application**.
3. Search and select Mixpanel to add as an application.

### Edit SAML Config in Microsoft Azure

1. Click **Single sign-on** under **Manage**.
2. Enter the following information in the SAML Configuration:
- Entity ID: https://mixpanel.com/security/sso/v2/authorize/
- Reply URL: https://sso.mixpanel.com/sso/saml2
- Sign on URL: Postback URL from Mixpanel (should look like https://mixpanel.com/security/sso/v2/authorize/?org_id=YOUR_ORG_ID)
  
![Azure Config 1 Image](/azure_config1.png)

  
3. Click **Edit** under **User Attributes & Claims** to add the required email claim (firstName and lastName are used for provisioning and optional).
  
![Azure Config 2 Image](/azure_config2.png)

Make sure to clear out the Namespace field as well or it won't work!

![Azure Config 3 Image](/azure_config3.png)
  
4. Download the SAML certificate under **SAML Signing Certificate** by clicking **Download** next to the **Certificate (Base64)** field. If you downloaded an .xml file then you have clicked the wrong button, make sure it is a .cer or .pem file. This will be uploaded to Mixpanel in the next step.

### Copy Certificate into Mixpanel

1. Navigate to the **Access Security** section in your Mixpanel **Organization Settings**.
2. Upload the certificate in the SAML Certificate field. 
3. Input the Azure AD Identifier into the Issuer URL field.
4. Input the Azure Login URL in the Identity Provider Sign-in URL field. 
5. Assign your team members this new application.
    
### SCIM Provisioning
  
Azure has an autoprovisioning integration with Mixpanel that lets you automatically add users to Mixpanel upon giving them access in Azure, and likewise removing access within Mixpanel when you remove access in Azure. You can find more information [here](https://learn.microsoft.com/en-us/azure/active-directory/saas-apps/mixpanel-provisioning-tutorial). Note that it is advised you turn on IDP Managed Access if you are using SCIM Provisioning.
Tenant URL: https://mixpanel.com/api/app/scim/v2
