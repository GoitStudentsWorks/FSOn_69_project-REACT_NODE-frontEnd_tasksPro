import { useState } from 'react';
import { useFormik } from 'formik';
import { useEditProfile } from 'hooks';
import PropTypes from 'prop-types';
import { userUpdateSchema } from 'validationSchemas/';

import {
  Input,
  PopUpLayout,
  PrimaryButton,
  SvgIcon,
  UserAvatar,
} from 'components';

import {
  AddButtonWrap,
  AvatarBg,
  AvatarInput,
  AvatarWrap,
  Container,
} from './ProfilePopUp.styled.js';

const initialValues = {
  name: '',
  email: '',
  password: '',
  newPassword: '',
};
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const ProfilePopUp = ({ user, handleModalClose }) => {
  const [isRequiredInputFocused, setIsRequiredInputFocused] = useState(false);

  const { userAvatar, isAvatarLoad, handleChangeProfile, handleUserAvatar } =
    useEditProfile(user);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: handleChangeProfile,
      validationSchema: userUpdateSchema,
    });

  const handleModalSubmit = () => {
    handleSubmit();
    handleModalClose();
  };

  return (
    <Container>
      <PopUpLayout title="Edit profile" handleClose={handleModalClose}>
        <AvatarWrap>
          <AvatarInput
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            background={userAvatar}
            onChange={handleUserAvatar}
          />
          {userAvatar ? (
            <UserAvatar avatar={userAvatar} />
          ) : (
            <AvatarBg size="68" />
          )}
          <AddButtonWrap>
            <SvgIcon svgName="icon-plus" variant="header" />
          </AddButtonWrap>
        </AvatarWrap>
        <form style={formStyle} onSubmit={handleModalSubmit}>
          <Input
            name="name"
            type="name"
            placeholder={user?.name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />

          {errors.name && touched.name ? (
            <span style={{ color: 'white' }}>{errors.name}</span>
          ) : null}

          <Input
            name="email"
            type="email"
            placeholder={user?.email}
            onChange={handleChange}
            onBlur={e => handleBlur(e)}
            onFocus={() => setIsRequiredInputFocused(true)}
            value={values.email}
          />
          {errors.email && touched.email ? (
            <span style={{ color: 'white' }}>{errors.email}</span>
          ) : null}

          <Input
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            onChange={handleChange}
            onBlur={e => handleBlur(e)}
            onFocus={() => setIsRequiredInputFocused(true)}
            value={values.password}
          />
          {errors.newPassword && touched.newPassword ? (
            <span style={{ color: 'white' }}>{errors.newPassword}</span>
          ) : null}

          {isRequiredInputFocused && (
            <>
              <Input
                name="password"
                type="password"
                placeholder="Enter your current password for confirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              {errors.password && touched.password ? (
                <span style={{ color: 'white' }}>{errors.password}</span>
              ) : null}
            </>
          )}

          <PrimaryButton
            disabled={
              !isAvatarLoad &&
              !values.name &&
              !values.email &&
              !values.password &&
              !values.confirmPassword
            }
            style={{ marginTop: '10px' }}
            hasIcon={false}
            type="submit"
          >
            Send
          </PrimaryButton>
        </form>
      </PopUpLayout>
    </Container>
  );
};

ProfilePopUp.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  handleModalClose: PropTypes.func.isRequired,
};

export default ProfilePopUp;
